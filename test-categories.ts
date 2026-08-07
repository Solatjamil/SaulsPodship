import { CATEGORIES } from './api/data.js';
const creed = CATEGORIES.find(c => c.title === "Apostle's Creed");
console.log(creed?.content?.analysis?.substring(0, 100) || 'NOT FOUND OR EMPTY');
