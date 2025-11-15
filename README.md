# Code Ninjas Photo Gallery

A photo album viewer with Airtable integration, deployable on FastComet hosting.

## 🛠️ Local Development Setup

**Before you start working locally:**

1. **Create your config file:**
   ```bash
   cp api/config.example.php api/config.php
   ```

2. **Edit `api/config.php` and add your Airtable credentials:**
   - `AIRTABLE_API_KEY` - Your Airtable Personal Access Token
   - `AIRTABLE_BASE_ID` - Your Airtable Base ID
   - `AIRTABLE_TABLE_ID` - Your Airtable Table Name or ID

3. **Start a local PHP server:**
   
   **If PHP is not installed:** See `LOCAL_SETUP.md` for installation instructions.
   
   ```bash
   # Option 1: Using PHP's built-in server (requires PHP installed)
   php -S localhost:8000

   # - Access at http://localhost:8000
   ```

4. **Test locally:**
   - Open `http://localhost:8000/portfolio_grid3.html` in your browser
   - The `api/config.php` file will work locally and on FastComet!

**Important:** `api/config.php` is in `.gitignore`, so it won't be committed to GitHub. You can safely work locally with your API keys, and then upload `config.php` directly to FastComet when you deploy.

## 🚀 Deployment to FastComet

When you're ready to go live:

1. **Push to GitHub (without config.php):**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
   ✅ Your `config.php` won't be pushed (it's gitignored)

2. **Upload files to FastComet:**
   - Upload all files to your FastComet hosting via FTP/cPanel File Manager
   - Place files in your public directory (usually `public_html` or `www`)
   - **Important:** Also upload your local `api/config.php` file directly to the server
     - This file should NOT be in git, so upload it separately via FTP/cPanel

3. **Set File Permissions (via cPanel/FTP):**
   - Ensure `api/config.php` has read permissions (644 or 600)
   - PHP should already be enabled on FastComet

4. **Test Your Live Site:**
   - Visit `https://yourdomain.com/api/airtable.php` 
   - You should see JSON data from Airtable
   - Your gallery: `https://yourdomain.com/portfolio_grid3.html`

## 🔒 Security

✅ **API keys are secure!** 

- Keys are stored in `api/config.php` (in `.gitignore`, never committed to git)
- PHP proxy acts as a secure server-side proxy (keys never reach the browser)
- Safe to push to public GitHub repositories
- `config.php` stays local for development, upload directly to FastComet when deploying

## 📁 File Structure

- `index.html` - Home page with fullscreen slider
- `gallery_albums.html` - Albums gallery page
- `portfolio_grid3.html` - Individual photo grid page (with Airtable integration)
- `api/airtable.php` - PHP proxy for Airtable API (keeps keys secure)
- `api/config.example.php` - Template for config (copy to config.php)
- `api/config.php` - Your actual API keys (gitignored, don't commit!)

## 🌐 API Endpoint

**Endpoint:** `/api/airtable.php`

Optional query parameters:
- `offset` - For pagination
- `maxRecords` - Maximum records to return (default: 100)
- `view` - Airtable view name to use

Example: `/api/airtable.php?maxRecords=50&view=Grid%20view`

## 📝 Workflow Summary

1. **Local Development:**
   - Create `api/config.php` from example (gitignored ✅)
   - Work locally with your API keys
   - Test everything locally

2. **GitHub:**
   - Push your code (config.php stays local, not in git ✅)
   - Safe to make repository public

3. **FastComet Deployment:**
   - Upload all files via FTP/cPanel
   - **Also upload your local `api/config.php` separately** (it's not in git!)
   - Your site is live with secure API keys

