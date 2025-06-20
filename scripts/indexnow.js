import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Generate a unique API key for IndexNow
const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Create the API key file in both public and out directories for static export
const createApiKeyFile = (apiKey) => {
  const keyContent = apiKey;

  // Create in public directory (for development and build)
  const publicKeyPath = path.join(process.cwd(), 'public', `${apiKey}.txt`);
  fs.writeFileSync(publicKeyPath, keyContent);
  console.log(`✅ IndexNow API key file created: public/${apiKey}.txt`);

  // Also create in out directory if it exists (for static export)
  const outKeyPath = path.join(process.cwd(), 'out', `${apiKey}.txt`);
  if (fs.existsSync(path.join(process.cwd(), 'out'))) {
    fs.writeFileSync(outKeyPath, keyContent);
    console.log(`✅ IndexNow API key file copied to: out/${apiKey}.txt`);
  }

  return apiKey;
};

// Submit URLs to IndexNow
const submitToIndexNow = async (urls, apiKey) => {
  const indexNowUrl = 'https://api.indexnow.org/indexnow';

  const payload = {
    host: 'scam-radar.net',
    key: apiKey,
    keyLocation: `https://scam-radar.net/${apiKey}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch(indexNowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ Successfully submitted ${urls.length} URLs to IndexNow`);
      console.log('📋 Submitted URLs:');
      urls.forEach(url => console.log(`   - ${url}`));
    } else {
      console.error(`❌ IndexNow submission failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
  }
};

// Get all locale URLs
const getLocaleUrls = () => {
  const baseUrl = 'https://scam-radar.net';
  const locales = ['en', 'ru', 'uk', 'id', 'zh'];

  return locales.map(locale => `${baseUrl}/${locale}`);
};

// Copy API key file to static export after build
const copyApiKeyToStaticExport = (apiKey) => {
  const publicKeyPath = path.join(process.cwd(), 'public', `${apiKey}.txt`);
  const outKeyPath = path.join(process.cwd(), 'out', `${apiKey}.txt`);

  if (fs.existsSync(publicKeyPath) && fs.existsSync(path.join(process.cwd(), 'out'))) {
    fs.copyFileSync(publicKeyPath, outKeyPath);
    console.log(`✅ API key file copied to static export: out/${apiKey}.txt`);
  }
};

// Main function
const main = async () => {
  console.log('🚀 Setting up IndexNow for Scam Radar (Static Site)...');

  // Generate or use existing API key
  let apiKey = process.env.INDEXNOW_API_KEY || 'fafc1a2fc6b142caaa6b0d6f586bf5ce';

  if (!apiKey) {
    apiKey = generateApiKey();
    createApiKeyFile(apiKey);

    // Save to .env file for future use
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = `INDEXNOW_API_KEY=${apiKey}\n`;

    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, envContent);
    } else {
      const existingContent = fs.readFileSync(envPath, 'utf8');
      if (!existingContent.includes('INDEXNOW_API_KEY')) {
        fs.appendFileSync(envPath, envContent);
      }
    }

    console.log(`💾 API key saved to .env.local: ${apiKey}`);
  } else {
    // If API key exists, ensure the file is created
    createApiKeyFile(apiKey);
  }

  // Copy to static export if out directory exists
  copyApiKeyToStaticExport(apiKey);

  // Get URLs to submit
  const urls = [
    'https://scam-radar.net/',
    ...getLocaleUrls(),
    'https://scam-radar.net/en#referral',
    'https://scam-radar.net/ru#referral',
    'https://scam-radar.net/uk#referral',
    'https://scam-radar.net/id#referral',
    'https://scam-radar.net/zh#referral'
  ];

  console.log(`📤 Submitting ${urls.length} URLs to IndexNow...`);
  await submitToIndexNow(urls, apiKey);

  console.log('🎉 IndexNow setup complete for static site!');
  console.log(`🔑 Your API key: ${apiKey}`);
  console.log('📄 API key file location: https://scam-radar.net/' + apiKey + '.txt');
  console.log('📁 Static export: The API key file will be included in your static export');
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as indexNow, generateApiKey, submitToIndexNow, copyApiKeyToStaticExport };
