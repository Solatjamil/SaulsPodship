require('ts-node').register();
const { CATEGORIES } = require('./api/data.ts');
const creed = CATEGORIES.find(c => c.title === "Apostle's Creed");
console.log(creed.content.analysis.substring(0, 100));
