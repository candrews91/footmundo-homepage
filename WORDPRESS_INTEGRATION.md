# WordPress Integration Guide

This Next.js application can be integrated with your WordPress site in several ways:

## How to Serve This as Your Root Domain

### Option 1: Deploy to Vercel and Point Your Domain (Recommended)

This is the easiest and most performant solution:

1. **Deploy this app to Vercel:**
   - Click the "Publish" button in the top right of v0
   - Or push to GitHub and connect to Vercel
   - Your app will be deployed at a Vercel URL (e.g., `footmundo-homepage.vercel.app`)

2. **Move WordPress to a subdomain:**
   - In your hosting control panel (cPanel, Plesk, etc.), move your WordPress installation to `wp.footmundo.co.uk` or `cms.footmundo.co.uk`
   - Update WordPress Site URL and Home URL in Settings > General

3. **Point your main domain to Vercel:**
   - In Vercel, go to your project settings > Domains
   - Add `footmundo.co.uk` as a custom domain
   - Vercel will provide DNS records (A record or CNAME)
   - Update your DNS settings at your domain registrar to point to Vercel
   - Wait for DNS propagation (usually 5-30 minutes)

4. **Update API endpoint:**
   - In this app, update the WordPress API URL from `https://footmundo.co.uk/wp-json/wp/v2/posts` to `https://wp.footmundo.co.uk/wp-json/wp/v2/posts`
   - This ensures the app fetches content from your WordPress backend

**Result:** Visitors to `footmundo.co.uk` see this Next.js app, while WordPress runs at `wp.footmundo.co.uk` as a headless CMS.

### Option 2: Reverse Proxy (Advanced)

If you want to keep WordPress at the same domain but serve this app at the root:

1. **Deploy this app to Vercel** (as above)

2. **Configure reverse proxy in your hosting:**
   - In your web server config (Apache/Nginx), set up a reverse proxy
   - Route `/` to your Vercel deployment
   - Route `/wp-admin`, `/wp-content`, `/wp-json` to WordPress
   
   Example Nginx config:
   \`\`\`nginx
   location / {
       proxy_pass https://your-app.vercel.app;
   }
   
   location ~ ^/(wp-admin|wp-content|wp-json|wp-includes) {
       # WordPress stays here
   }
   \`\`\`

3. **Update WordPress URLs:**
   - Keep WordPress Site URL as `https://footmundo.co.uk`
   - Content will be served from the same domain

**Result:** Everything appears to be on one domain, with the homepage served by Next.js and WordPress handling the backend.

### Option 3: Replace WordPress Entirely

If you want to fully migrate away from WordPress:

1. **Export all WordPress content** using WordPress export tools
2. **Migrate to a headless CMS** (Contentful, Sanity, Strapi) or static files
3. **Update this app** to fetch from the new content source
4. **Deploy to Vercel** and point your domain

## Current Setup

This app currently:
- Fetches posts from `https://footmundo.co.uk/wp-json/wp/v2/posts`
- Filters by category slugs (laliga, bundesliga, seriea, ligue-1, premier-league, eredivisie, liga-portugal)
- Displays real-time content from your WordPress site
- Works as a headless frontend for your WordPress backend

## Quick Start Steps

1. Click "Publish" in v0 (top right) to deploy to Vercel
2. In Vercel, add your custom domain `footmundo.co.uk`
3. Move WordPress to `wp.footmundo.co.uk` subdomain
4. Update DNS records to point to Vercel
5. Update API URLs in the app to use `wp.footmundo.co.uk`

That's it! Your new homepage will be live while WordPress continues to manage your content.
