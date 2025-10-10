# 🚀 Deployment Guide

## GitHub Pages (Recommended)

### Automatic Deployment

The project is configured with GitHub Actions for automatic deployment.

**Steps:**
1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be live at: `https://yourusername.github.io/energy-data-explorer/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (using gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

---

## Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/energy-data-explorer)

**Steps:**
1. Import your GitHub repository
2. Framework Preset: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Deploy

---

## Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/energy-data-explorer)

**Steps:**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Custom Server

### Build

```bash
npm run build
```

### Serve with Node.js

```bash
npm install -g serve
serve -s dist -p 3000
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Apache Configuration

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Environment Variables

For production, you may need to set:

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Energy Data Explorer
```

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Install imagemin
   npm install -g imagemin-cli
   
   # Optimize
   imagemin docs/*.png --out-dir=docs/optimized
   ```

2. **Analyze Bundle**
   ```bash
   npm run build -- --mode analyze
   ```

3. **Check Lighthouse Score**
   - Open Chrome DevTools
   - Run Lighthouse audit
   - Aim for 90+ in all categories

### CDN Configuration

For better performance, use a CDN:
- Cloudflare
- AWS CloudFront
- Google Cloud CDN

---

## Monitoring

### Analytics

Add Google Analytics or Plausible:

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking

Consider adding:
- Sentry
- LogRocket
- Bugsnag

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Refresh

Make sure your server is configured for SPA routing (see configurations above).

### Assets Not Loading

Check the `base` path in `vite.config.js` matches your deployment URL.

---

## Checklist

- [ ] Build succeeds locally
- [ ] All features tested
- [ ] Environment variables set
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Favicon added
- [ ] SSL certificate configured
- [ ] Custom domain configured (if applicable)

---

**Your app is ready for production! 🎉**
