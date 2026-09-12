#!/usr/bin/env node
/**
 * cleanup-deployments.mjs — bulk-delete old Vercel deployments to free Deployment Storage.
 *
 * Usage:
 *   export VERCEL_TOKEN=***          # vercel.com -> Account Settings -> Tokens
 *   node cleanup-deployments.mjs --project sauls-podship               # dry run: prints a plan
 *   node cleanup-deployments.mjs --project sauls-podship --yes         # actually deletes
 *
 * Options:
 *   -p, --project <slug|id>     Project to clean (default: prompt from list of projects)
 *   -t, --team <slug|id>        Team id/slug (only needed for team-scoped tokens)
 *       --keep-production <n>   Keep the n most recent production deployments (default 3)
 *       --keep-preview <n>      Keep the n most recent preview deployments   (default 3)
 *       --older-than-days <n>   Only delete deployments older than n days (default 0 = any age)
 *   -y, --yes                   Skip confirmation and delete (default is dry run)
 *
 * Safety:
 *   - Dry run by default; nothing is deleted without --yes.
 *   - The newest production deployment (what your domain currently serves) is never deleted.
 *   - Vercel keeps deleted deployments restorable for 30 days.
 *   - On Hobby, Vercel already auto-purges deployments older than 30 days (except the 10 most
 *     recent production + aliased ones), so this script mainly helps with recent heavy deploys.
 */

import process from 'node:process';
import readline from 'node:readline/promises';

const API = 'https://api.vercel.com';

function usage() {
  console.log(`Usage: VERCEL_TOKEN=*** node cleanup-deployments.mjs --project <slug> [--yes]
Options:
  -p, --project <slug|id>    Project to clean
  -t, --team <slug|id>       Team id/slug (optional)
      --keep-production <n>  Keep n most recent production deployments (default 3)
      --keep-preview <n>     Keep n most recent preview deployments (default 3)
      --older-than-days <n>  Only delete deployments older than n days (default 0)
  -y, --yes                  Actually delete (default: dry run)`);
}

function parseArgs(argv) {
  const opts = { project: null, team: null, keepProduction: 3, keepPreview: 3, olderThanDays: 0, yes: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined) { console.error(`Missing value for ${a}`); process.exit(1); }
      return v;
    };
    switch (a) {
      case '-p': case '--project': opts.project = next(); break;
      case '-t': case '--team': opts.team = next(); break;
      case '--keep-production': opts.keepProduction = Number(next()); break;
      case '--keep-preview': opts.keepPreview = Number(next()); break;
      case '--older-than-days': opts.olderThanDays = Number(next()); break;
      case '-y': case '--yes': opts.yes = true; break;
      case '-h': case '--help': usage(); process.exit(0);
      default: console.error(`Unknown argument: ${a}`); usage(); process.exit(1);
    }
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const TOKEN = process.env.VERCEL_TOKEN;
if (!TOKEN) {
  console.error('ERROR: set VERCEL_TOKEN first, e.g.  VERCEL_TOKEN=*** node cleanup-deployments.mjs --project sauls-podship');
  process.exit(1);
}

async function api(path, method = 'GET') {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${API}${path}${opts.team ? `${sep}teamId=${encodeURIComponent(opts.team)}` : ''}`;
  const res = await fetch(url, { method, headers: { Authorization: `Bearer ${TOKEN}` } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message || body?.error?.code || res.statusText;
    throw new Error(`${method} ${path} -> ${res.status}: ${msg}`);
  }
  return body;
}

async function resolveProjectId() {
  if (opts.project) {
    const p = await api(`/v9/projects/${encodeURIComponent(opts.project)}`);
    return { id: p.id, name: p.name };
  }
  const { projects } = await api('/v9/projects?limit=50');
  if (!projects?.length) throw new Error('No projects found for this token.');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  projects.forEach((p, i) => console.log(`  [${i}] ${p.name}`));
  const answer = await rl.question('Project index or slug: ');
  rl.close();
  const pick = projects[Number(answer)] || projects.find((p) => p.name === answer);
  if (!pick) throw new Error('Project not found.');
  return { id: pick.id, name: pick.name };
}

async function listDeployments(projectId) {
  const all = [];
  let until = null;
  for (let page = 0; page < 20; page++) {
    const params = new URLSearchParams({ projectId, limit: '100' });
    if (until) params.set('until', String(until));
    const body = await api(`/v6/deployments?${params}`);
    const batch = body.deployments ?? [];
    // de-duplicate overlapping pages
    for (const d of batch) if (!all.some((x) => x.uid === d.uid)) all.push(d);
    const nextUntil = body.pagination?.until;
    if (!batch.length || !nextUntil || batch.length < 100) break;
    until = nextUntil;
  }
  return all.sort((a, b) => b.created - a.created);
}

const fmtDate = (ts) => new Date(ts).toISOString().slice(0, 16).replace('T', ' ');
const fmtAge = (ts) => `${Math.floor((Date.now() - ts) / 86400000)}d`;

async function main() {
  const project = await resolveProjectId();
  console.log(`\nProject: ${project.name} (${project.id})`);
  const deployments = await listDeployments(project.id);
  console.log(`Found ${deployments.length} deployment(s).\n`);

  const cutoff = Date.now() - opts.olderThanDays * 86400000;
  let prodKept = 0;
  let prevKept = 0;
  const plan = [];

  for (const d of deployments) {
    const isProd = d.target === 'production';
    const reason = [];
    let keep = false;
    if (isProd && prodKept < Math.max(1, opts.keepProduction)) { keep = true; prodKept++; reason.push(isProd && prodKept === 1 ? 'currently live production' : `keep production #${prodKept}`); }
    else if (!isProd && prevKept < opts.keepPreview) { keep = true; prevKept++; reason.push(`keep preview #${prevKept}`); }
    else if (opts.olderThanDays > 0 && d.created >= cutoff) { keep = true; reason.push(`newer than ${opts.olderThanDays}d`); }
    plan.push({ d, keep, reason: keep ? reason.join(', ') : `delete (${isProd ? 'old production' : d.readyState.toLowerCase()} ${fmtAge(d.created)} old)` });
  }

  const del = plan.filter((p) => !p.keep);
  for (const { d, keep, reason } of plan) {
    console.log(
      `  ${keep ? 'KEEP  ' : 'DELETE'}  ${fmtDate(d.created)}  ${String(d.readyState).padEnd(10)} ${(d.target || '-').padEnd(10)} ${d.url?.padEnd(48) ?? ''} ${reason}`
    );
  }

  console.log(`\nPlan: keep ${plan.length - del.length}, delete ${del.length}.`);
  if (!del.length) { console.log('Nothing to delete.'); return; }
  if (!opts.yes) {
    console.log('DRY RUN — no changes made. Re-run with --yes to delete the marked deployments.');
    return;
  }

  let ok = 0;
  let failed = 0;
  for (const { d } of del) {
    try {
      const res = await fetch(`${API}/v13/deployments/${d.uid}${opts.team ? `?teamId=${encodeURIComponent(opts.team)}` : ''}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (res.ok || res.status === 404) { ok++; console.log(`  deleted ${d.url}`); }
      else { failed++; const b = await res.json().catch(() => ({})); console.log(`  FAILED ${d.url}: ${res.status} ${b?.error?.message ?? ''}`); }
    } catch (e) { failed++; console.log(`  FAILED ${d.url}: ${e.message}`); }
  }
  console.log(`\nDone: ${ok} deleted, ${failed} failed. Storage frees up as Vercel reclaims the output (Usage page updates within minutes-hours). Deleted deploys stay restorable for 30 days.`);
}

main().catch((e) => { console.error(`\nERROR: ${e.message}`); process.exit(1); });
