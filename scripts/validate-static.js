import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');

console.log('🔍 Validating static export...');

// Check if static files were generated
if (!fs.existsSync(outDir)) {
  console.error('❌ Static export failed - out/ directory not found');
  process.exit(1);
}

console.log('✅ out/ directory exists');

// Check for locale pages (they are individual HTML files in root)
const locales = ['en', 'ru', 'uk', 'id', 'zh'];
let missingLocales = [];

locales.forEach(locale => {
  const localeFile = path.join(outDir, `${locale}.html`);

  if (!fs.existsSync(localeFile)) {
    missingLocales.push(`${locale} (${locale}.html missing)`);
  } else {
    console.log(`✅ ${locale} locale page exists (${locale}.html)`);
  }
});

// Check for essential files
const essentialFiles = [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'manifest.json'
];

essentialFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (!fs.existsSync(filePath)) {
    missingLocales.push(`${file} (missing)`);
  } else {
    console.log(`✅ ${file} exists`);
  }
});

// Check for IndexNow API key file
const apiKey = process.env.INDEXNOW_API_KEY || 'fafc1a2fc6b142caaa6b0d6f586bf5ce';
const apiKeyFile = path.join(outDir, `${apiKey}.txt`);

if (!fs.existsSync(apiKeyFile)) {
  missingLocales.push(`IndexNow API key file (${apiKey}.txt missing)`);
} else {
  console.log(`✅ IndexNow API key file exists (${apiKey}.txt)`);
}

// Report results
if (missingLocales.length > 0) {
  console.error('❌ Missing files:');
  missingLocales.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
} else {
  console.log('🎉 All static files validated successfully!');
  console.log('📁 Static export is ready for deployment');
}
