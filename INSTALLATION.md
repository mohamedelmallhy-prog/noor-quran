# 🚀 Installation & Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: For version control (optional)

Check your versions:
```bash
node --version
npm --version
```

### 2. Installation Steps

#### Step 1: Navigate to Project
```bash
cd c:\Users\MOHAM\OneDrive\Desktop\noirframe
```

#### Step 2: Install Dependencies
```bash
npm install
```

This will install all packages from `package.json`:
- React & React DOM
- React Router
- Framer Motion
- Tailwind CSS
- Lucide Icons
- Vite (build tool)

**Installation Time**: ~2-3 minutes (depending on internet speed)

#### Step 3: Start Development Server
```bash
npm run dev
```

The server will start and typically open at: `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` folder ready for deployment.

## 📋 Project Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production-optimized build |
| `npm run preview` | Preview production build locally |
| `npm run start` | Alias for `dev` |

## 🔧 Project Structure

```
noirframe/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components (Home, Listen, Read)
│   ├── utils/               # Helper functions & constants
│   ├── App.jsx              # Main app component
│   ├── index.jsx            # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── vite.config.js           # Vite bundler config
└── README.md                # Project documentation
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  gold: {
    500: '#your-custom-color'
  }
}
```

### Add New Component
1. Create file in `src/components/YourComponent.jsx`
2. Import React and Framer Motion
3. Export component
4. Use in your pages

Example:
```jsx
import { motion } from 'framer-motion';

export default function YourComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Your content here
    </motion.div>
  );
}
```

### Add New Page
1. Create file in `src/pages/YourPage.jsx`
2. Add route in `App.jsx`:
```jsx
<Route path="/your-page" element={<YourPage />} />
```
3. Link to it from navigation

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will try the next available port.

Change default port in `vite.config.js`:
```javascript
server: {
  port: 3000,  // Change to your preferred port
}
```

### Dependencies Not Installing
Clear cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Hot Reload Not Working
Restart the dev server:
```bash
# Stop with Ctrl+C
npm run dev
```

### Styles Not Updating
Restart dev server and clear browser cache.

### Build Errors
Check for syntax errors:
```bash
npm run build
```

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Auto-deploy on push

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Traditional Server
```bash
npm run build
# Upload 'dist' folder contents to web server
```

## 🔒 Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```
VITE_API_BASE_URL=https://api.quran.com
VITE_AUDIO_BASE_URL=https://audio.quran.com
```

## 🎯 Next Steps

1. **Start Dev Server**: `npm run dev`
2. **Explore Components**: Check files in `src/components/`
3. **Read README.md**: For detailed feature documentation
4. **Customize Colors**: Edit `tailwind.config.js`
5. **Add API Integration**: Connect real Quran API
6. **Deploy**: Follow deployment guide above

## 💡 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant feedback as you edit:
- Save changes
- See updates immediately in browser
- Preserves component state

### Browser DevTools
1. Open DevTools: `F12` or `Right-click > Inspect`
2. Use React DevTools extension for better debugging
3. Check Console for errors

### CSS Utilities
All Tailwind classes are available:
```jsx
className="
  bg-dark-900
  text-gold-500
  rounded-lg
  p-4
  hover:bg-dark-800
  transition-all
"
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

## ✅ Verification Checklist

After installation, verify:
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (`npm install` successful)
- [ ] Dev server runs (`npm run dev`)
- [ ] App opens in browser
- [ ] Sidebar menu works
- [ ] Navigation functions
- [ ] Page transitions smooth
- [ ] Responsive on mobile

## 🆘 Getting Help

1. Check console for error messages: `F12 > Console`
2. Re-read this guide's Troubleshooting section
3. Check individual component files for inline comments
4. Review README.md for feature documentation

---

**Happy Coding! 🎉**
