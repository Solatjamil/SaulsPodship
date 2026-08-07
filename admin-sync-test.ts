import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

initializeApp({
  credential: applicationDefault(),
  projectId: firebaseConfig.projectId
});

const db = getFirestore(firebaseConfig.firestoreDatabaseId);

async function run() {
    try {
        const docRef = db.collection("volumes").doc("test");
        await docRef.set({ test: true });
        console.log("Success with admin SDK!");
    } catch (e) {
        console.error(e);
    }
}
run();
