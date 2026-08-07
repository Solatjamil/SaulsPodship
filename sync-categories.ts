import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { CATEGORIES } from './api/data.js';

const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const getSEOUrlSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

async function sync() {
  console.log(`Starting sync of ${CATEGORIES.length} categories to Firestore...`);

  for (const cat of CATEGORIES) {
    const slug = getSEOUrlSlug(cat.title);
    const volumeNumber = parseInt(cat.id, 10);
    const docRef = doc(db, "volumes", slug);

    // Prepare content object
    const analysis = cat.content?.analysis || "";
    const tables = (cat.content?.tables || []).map((tbl: any) => ({
      title: tbl.title || "",
      headers: tbl.headers || [],
      rows: (tbl.rows || []).map((rowArr: any) => {
        if (Array.isArray(rowArr)) {
          return { cells: rowArr };
        }
        return rowArr; // If already mapped
      })
    }));

    const storyPanels = (cat.content?.storyPanels || []).map((panel: any) => ({
      id: panel.id || "",
      title: panel.title || "",
      description: panel.description || "",
      scripture: panel.scripture || "",
      imagePrompt: panel.imagePrompt || "",
      colorTheme: panel.colorTheme || "",
      era: panel.era || ""
    }));

    const maps = (cat.content?.maps || []).map((m: any) => ({
      id: m.id || "",
      title: m.title || "",
      description: m.description || "",
      scripture: m.scripture || "",
      imagePrompt: m.imagePrompt || "",
      colorTheme: m.colorTheme || "",
      era: m.era || ""
    }));

    const dataPayload = {
      id: slug,
      volumeNumber,
      title: cat.title,
      subtitle: cat.subtitle || "",
      teaser: cat.overview || cat.subtitle || cat.title,
      overview: cat.overview || "",
      content: {
        analysis,
        tables,
        storyPanels,
        maps
      },
      articleLink: cat.articleLink || "",
      youtubeLink: cat.youtubeLink || "",
      metaTitle: (cat as any).metaTitle || `${cat.title} | Saul's Podship`,
      metaDescription: (cat as any).metaDescription || `Comprehensive exegesis and theological analysis of ${cat.title} at Saul's Podship.`,
      relatedVolumeIds: (cat as any).relatedVolumeIds || [],
      updatedAt: serverTimestamp()
    };

    console.log(`Syncing Volume ${volumeNumber}: "${cat.title}" (slug: "${slug}")...`);
    await setDoc(docRef, dataPayload);
  }

  console.log("All categories synced successfully!");
}

sync().catch((err) => {
  console.error("Error during sync:", err);
  process.exit(1);
});
