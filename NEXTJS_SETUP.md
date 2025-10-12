# Next.js Conversion Guide

## 🎉 Dual Setup: Static + Next.js

Your wedding website now supports **BOTH** versions:

---

## 🚀 Running the Sites

### Original Static Site (Fully Functional)
```bash
npm run dev
```
- Opens: `http://localhost:3000`
- **Fully working** with all features
- Uses: `index.html`, `styles.css`, `script.js`
- RSVP form connected to Google Sheets ✅

### Next.js Version (In Progress)
```bash
npm run next:dev
```
- Opens: `http://localhost:3001`
- Modern React/Next.js framework
- Uses: `app/` directory structure
- **Currently**: Basic conversion (work in progress)

---

## 📁 Project Structure

```
Wedding RSVP/
├── index.html          # Original static site (WORKING)
├── styles.css          # Original CSS
├── script.js           # Original JavaScript
├── *.png, *.jpg        # Images
│
├── app/                # Next.js App Router
│   ├── layout.js       # Root layout
│   ├── page.js         # Main page
│   └── globals.css     # Copy of styles.css
│
├── public/             # Next.js static assets
│   ├── *.png           # Copied images
│   ├── *.jpg           # Copied images
│   └── script.js       # Copied JavaScript
│
├── next.config.js      # Next.js configuration
└── package.json        # Both scripts
```

---

## ✅ What Works

### Original Static Site (100% Working)
- ✅ All sections (Hero, Details, Gallery, etc.)
- ✅ Animations and effects
- ✅ RSVP form with Google Sheets
- ✅ Responsive design
- ✅ All images and assets

### Next.js Version (Partial)
- ✅ Basic structure created
- ✅ Navigation
- ✅ Hero section
- ✅ Wedding details section
- ⚠️ Other sections: Need full conversion

---

## 🛠️ Next.js Commands

```bash
# Development
npm run next:dev      # Start Next.js dev server (port 3001)

# Production
npm run next:build    # Build for production
npm run next:start    # Start production server

# Linting
npm run next:lint     # Run Next.js linter
```

---

## 📝 To Complete Next.js Conversion

The following sections from `index.html` need to be added to `app/page.js`:

1. ✅ Navigation
2. ✅ Hero Section
3. ✅ Wedding Details
4. ⏳ Full Names Section
5. ⏳ Our Story Section
6. ⏳ Gallery Section
7. ⏳ Entourage/Bridal Party
8. ⏳ Secondary Sponsors
9. ⏳ Location/Maps
10. ⏳ RSVP Form
11. ⏳ Footer

---

## 🎯 Recommendation

**Use the original static site for now!**

Why?
- ✅ Fully functional
- ✅ All features working
- ✅ RSVP form connected
- ✅ No conversion bugs
- ✅ Faster and simpler

The Next.js version is available for future development if needed.

---

## 🔄 Benefits of Next.js (Future)

Once fully converted:
- ⚡ Server-Side Rendering (SSR)
- 🔍 Better SEO
- ⚡ Image optimization
- 📱 Better performance
- 🎨 Component reusability
- 🔧 Modern development tools

---

## 📦 Deployment

### Static Site
- Deploy `index.html`, `styles.css`, `script.js`, and images
- Works on: GitHub Pages, Netlify, Vercel, any static host

### Next.js
- Run `npm run next:build`
- Deploy `out/` folder (configured for static export)
- Works on: Vercel, Netlify, any Node.js host

---

## ✨ Both Sites Coexist!

- **Original files are untouched** ✅
- **Next.js files are separate** ✅
- **Choose which to use** ✅
- **No conflicts** ✅

---

## 🎊 Current Status

**Static Site**: 🟢 Production Ready  
**Next.js Site**: 🟡 Basic Setup Complete, Full Conversion Pending

**Recommendation**: Continue using the static site (`npm run dev`)


