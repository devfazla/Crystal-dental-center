# Crystal Dental Center (مركز كريستال لطب وتجميل الأسنان)

A premier dental center web application located in Crystal Tower, Sharq, Kuwait, led by Dr. Muneera Abdullatif Al-Mansoor.

## Features
- **Bilingual Experience**: Seamless English and Arabic (RTL) localization with instant switching.
- **Hero Video Showcase**: Custom HTML5 media player with 4:3 clinic video, play/pause, scrub bar, volume, fullscreen, and smooth controls.
- **Interactive Dental Disciplines**: Comprehensive service showcase with detailed consultation modal and direct WhatsApp integration.
- **2X/1X Dynamic Clinic Gallery**: Fluid hover spotlight effect and dedicated full-screen lightbox photo tour.
- **Patient Reviews**: Continuous dual-direction marquee testimonials and clinical satisfaction statistics.
- **Direct Appointment Booking**: WhatsApp appointment confirmation with service, name, telephone, and preferred timing.

---

## GitHub Pages Deployment & Custom Domain Setup

This project is fully pre-configured for **GitHub Pages** with custom domain support:

### 1. Automated Deployment (GitHub Actions)
A production-ready GitHub Actions workflow is included at `.github/workflows/deploy.yml`:
1. Push your code to the `main` or `master` branch on GitHub.
2. In your repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push will automatically build the Vite production bundle and publish it to GitHub Pages.

### 2. Custom Domain Configuration (`CNAME`)
1. Open `public/CNAME` and replace the placeholder domain with your custom domain (e.g. `yourdomain.com` or `clinic.yourdomain.com`).
2. Point your DNS records at your domain registrar (e.g. Cloudflare, GoDaddy, Namecheap):
   - **For apex / root domain (`yourdomain.com`)**:
     Add 4 `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **For subdomain / www (`www.yourdomain.com`)**:
     Add a `CNAME` record pointing to `<username>.github.io`.
3. In GitHub repository **Settings** > **Pages**:
   - Verify your custom domain is listed under **Custom domain**.
   - Check **Enforce HTTPS** (GitHub provides a free TLS/SSL certificate).

### 3. Alternative: Manual CLI Deployment
If you prefer deploying directly from your local terminal:
```bash
npm run deploy
```
This will automatically execute `npm run build` and push the `dist/` directory to the `gh-pages` branch.

---

## Local Development
```bash
# Install dependencies
npm install

# Start development server (Port 3000)
npm run dev

# Run type-check & lint
npm run lint

# Build production bundle
npm run build
```
