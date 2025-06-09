# Static Site Deployment Guide

This is a **static site** built with Next.js using `output: 'export'`. It supports:
- 🏠 **Local Development**
- 📄 **GitHub Pages**
- 🌐 **Any Static Hosting** (Netlify, Vercel Static, etc.)

---

## 🏠 Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

**Configuration**: No base path, works on localhost:3000

---

## 📄 GitHub Pages Deployment

### Prerequisites
- Repository named `scam-radar-web`
- Admin access to repository

### Step 1: Repository Settings
1. Go to your repository: `https://github.com/{your-username}/scam-radar-web`
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### Step 2: Deploy
1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Deploy static site"
   git push origin main
   ```

2. The GitHub Action will automatically build and deploy your site

### Step 3: Access Your Site
After deployment (usually 2-5 minutes), your site will be available at:
```
https://{your-username}.github.io/scam-radar-web/
```

---

## 🌐 Other Static Hosting

Since this is a static export, you can deploy the built files to any static hosting service:

### Build for Production
```bash
npm run build
```

This creates an `out/` folder with all static files.

### Popular Static Hosts:
- **Netlify**: Drag & drop the `out/` folder
- **Vercel**: Import repository and it auto-detects static export
- **Cloudflare Pages**: Connect repository
- **Firebase Hosting**: Deploy `out/` folder

---

## Configuration

### Environment Variables
- `NODE_ENV=production` - Enables production optimizations
- `GITHUB_PAGES=true` - Enables GitHub Pages base path (`/scam-radar-web`)

### File Structure
```
scam-radar-web/
├── .github/workflows/nextjs.yml  # GitHub Actions deployment
├── pages/                        # Next.js pages
├── locales/                      # Translation files
├── public/                       # Static assets
├── next.config.ts               # Next.js configuration
└── out/                         # Generated static files (after build)
```

### Key Features
✅ **Static Export**: No server required
✅ **Multi-language**: 5 supported locales
✅ **Client-side Routing**: Works with any static host
✅ **SEO Optimized**: Proper meta tags and canonical URLs
✅ **GitHub Pages Ready**: Automatic base path handling
