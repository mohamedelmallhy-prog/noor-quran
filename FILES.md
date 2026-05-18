# 📋 Project Files Reference

## 📁 Complete File Structure

### 🎯 Start Here
- **QUICK_START.md** - ⚡ 5-minute setup guide (START HERE!)
- **README.md** - 📖 Complete project documentation
- **INSTALLATION.md** - 🔧 Detailed installation & setup
- **FEATURES.md** - ✨ All premium features explained
- **DEVELOPMENT.md** - 👨‍💻 How to develop & extend

### ⚙️ Configuration Files
- **package.json** - 📦 Dependencies & scripts
- **vite.config.js** - 🚀 Build configuration
- **tailwind.config.js** - 🎨 Design tokens & theme
- **postcss.config.js** - 🎯 CSS processing
- **.gitignore** - 🚫 Git ignore rules
- **.env.example** - 🔐 Environment variables template
- **index.html** - 📄 HTML entry point

### 📁 src/ (Main Application)

#### src/App.jsx
**Main application component**
- React Router setup
- Page routing (Home, Listen, Read)
- Sidebar state management
- Layout structure

#### src/index.jsx
**React entry point**
- App initialization
- DOM mounting
- Global imports

#### src/index.css
**Global styles**
- Tailwind directives
- Custom animations
- Utility classes
- Scrollbar styling
- Font definitions

### 📁 src/components/ (Reusable Components)

#### Layout Components
1. **Navbar.jsx** (Top Navigation)
   - Logo with branding
   - Search bar
   - Notification bell
   - User avatar
   - Menu toggle button

2. **Sidebar.jsx** (Side Menu)
   - Collapsible drawer
   - Hamburger-triggered
   - Menu items
   - Backdrop overlay
   - Smooth animations

#### Interactive Components
3. **HeroSection.jsx** (Premium Hero)
   - Full 100vh viewport
   - Animated background
   - Floating orbs
   - Grid pattern
   - CTA buttons
   - Statistics
   - Scroll indicator

4. **FeatureCard.jsx** (Feature Showcase)
   - Glassmorphic design
   - Icon display
   - Hover animations
   - Arrow indicators

5. **SurahGrid.jsx** (Surah List)
   - Grid layout
   - Surah cards
   - Play buttons
   - Number badges

#### Media Components
6. **AudioPlayer.jsx** (Audio Controls)
   - Play/Pause button
   - Progress bar
   - Volume slider
   - Time display
   - Reciter info
   - Skip buttons

7. **SoundWaveAnimation.jsx** (Audio Visualization)
   - 40 animated bars
   - Gradient colors
   - Real-time animation

8. **AyahReader.jsx** (Verse Reader)
   - Arabic text (RTL)
   - English translation
   - Urdu translation
   - Interactive verses
   - Copy/Share/Listen actions

#### Navigation Components
9. **FloatingBackButton.jsx** (Floating Nav)
   - Fixed position back button
   - Appears on Listen/Read pages
   - Smooth animations
   - Returns to home

10. **ScrollToTop.jsx** (Scroll Control)
    - Appears after scrolling 300px
    - Smooth scroll animation
    - Gold gradient button
    - Bottom-right corner

### 📁 src/pages/ (Full Page Views)

#### Pages (3 Total)
1. **HomePage.jsx** (Landing)
   - Hero section
   - Features grid
   - Surahs showcase
   - CTA section

2. **ListenQuranPage.jsx** (Audio Interface)
   - Floating back button
   - Audio player
   - Surah selector
   - Sound wave animation
   - Responsive layout

3. **ReadQuranPage.jsx** (Text Reader)
   - Floating back button
   - Font size controls
   - Language selector
   - Ayah reader
   - Surah sidebar
   - Quick actions

### 📁 src/utils/ (Utility Functions)

#### Helpers
**helpers.js**
- `formatTime()` - Format MM:SS
- `debounce()` - Performance optimization
- `throttle()` - Limit function calls
- `isMobile()` - Device detection
- `getDeviceType()` - Device classifier
- `smoothScrollTo()` - Smooth scrolling
- `copyToClipboard()` - Copy functionality
- `shareContent()` - Share API
- `getSurah()` - Surah lookup
- `getAllSurahs()` - Get all chapters
- `saveToLocalStorage()` - Data persistence
- `getFromLocalStorage()` - Data retrieval
- `removeFromLocalStorage()` - Data deletion

#### Constants
**constants.js**
- API endpoints
- Surahs data (114 chapters)
- Qaris (reciters)
- Languages
- Font sizes
- Animation durations
- Breakpoints
- Color values
- Routes
- LocalStorage keys
- Error/Success messages

---

## 🎨 Key Features by File

### Design System
| Feature | File | Component |
|---------|------|-----------|
| Dark Theme | tailwind.config.js | Colors |
| Gold Accents | tailwind.config.js | Gold palette |
| Animations | tailwind.config.js | Keyframes |
| Responsive | tailwind.config.js | Breakpoints |
| Glass Effect | src/index.css | .glass-dark class |
| Gradients | src/index.css | Gradient utilities |

### Navigation
| Feature | File |
|---------|------|
| Sidebar | src/components/Sidebar.jsx |
| Navbar | src/components/Navbar.jsx |
| Routing | src/App.jsx |
| Back Button | src/components/FloatingBackButton.jsx |
| Scroll to Top | src/components/ScrollToTop.jsx |

### Pages
| Page | File | Route |
|------|------|-------|
| Home | src/pages/HomePage.jsx | / |
| Listen | src/pages/ListenQuranPage.jsx | /listen |
| Read | src/pages/ReadQuranPage.jsx | /read |

### Media
| Feature | File |
|---------|------|
| Audio Player | src/components/AudioPlayer.jsx |
| Sound Wave | src/components/SoundWaveAnimation.jsx |
| Text Reader | src/components/AyahReader.jsx |

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Total Files | 25+ |
| React Components | 10 |
| Page Components | 3 |
| Utility Functions | 20+ |
| Documentation Files | 5 |
| Configuration Files | 7 |
| Total Lines of Code | 2000+ |
| CSS Classes | 500+ |
| Custom Animations | 8 |

---

## 🚀 Quick File Actions

### To Change Colors
Edit: `tailwind.config.js` (colors section)

### To Change Fonts
Edit: `src/index.css` (font definitions)

### To Add Menu Items
Edit: `src/components/Sidebar.jsx` (menuItems array)

### To Add New Page
1. Create: `src/pages/NewPage.jsx`
2. Add route in: `src/App.jsx`
3. Add link in: `src/components/Sidebar.jsx`

### To Add New Component
Create: `src/components/MyComponent.jsx`

### To Modify Hero
Edit: `src/components/HeroSection.jsx`

### To Change Layout
Edit: `src/App.jsx` (App structure)

### To Add Global Styles
Edit: `src/index.css`

### To Add Animations
1. Define keyframes in: `tailwind.config.js`
2. Use in components with `animate-` class

### To Add Utilities
Add to: `src/utils/helpers.js`

### To Add Constants
Add to: `src/utils/constants.js`

---

## 📖 Documentation Map

```
Documentation Structure:
├── QUICK_START.md          ← START HERE (5 min)
├── README.md               ← Full overview
├── INSTALLATION.md         ← Setup guide
├── FEATURES.md             ← Feature details
├── DEVELOPMENT.md          ← Development guide
├── FILES.md                ← This file
└── Code Comments           ← In-file documentation
```

---

## 🎯 Common Tasks & Files

### Want to...
| Task | File(s) to Edit |
|------|-----------------|
| Change theme colors | tailwind.config.js |
| Add menu items | Sidebar.jsx |
| Modify hero section | HeroSection.jsx |
| Add new page | Create pages/*.jsx + update App.jsx |
| Change animations | src/index.css |
| Add utilities | src/utils/helpers.js |
| Update constants | src/utils/constants.js |
| Change navbar | Navbar.jsx |
| Add form validation | src/utils/helpers.js |
| Customize fonts | src/index.css |

---

## ✅ File Checklist

### Essential Files (Must Have)
- ✅ package.json
- ✅ src/App.jsx
- ✅ src/index.jsx
- ✅ src/index.css
- ✅ index.html
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ vite.config.js

### Component Files (UI)
- ✅ Navbar.jsx
- ✅ Sidebar.jsx
- ✅ HeroSection.jsx
- ✅ FeatureCard.jsx
- ✅ SurahGrid.jsx
- ✅ AudioPlayer.jsx
- ✅ SoundWaveAnimation.jsx
- ✅ AyahReader.jsx
- ✅ FloatingBackButton.jsx
- ✅ ScrollToTop.jsx

### Page Files
- ✅ HomePage.jsx
- ✅ ListenQuranPage.jsx
- ✅ ReadQuranPage.jsx

### Utility Files
- ✅ helpers.js
- ✅ constants.js

### Documentation
- ✅ README.md
- ✅ INSTALLATION.md
- ✅ FEATURES.md
- ✅ DEVELOPMENT.md
- ✅ QUICK_START.md

---

## 🔄 Development Workflow

1. **Edit Component** → src/components/MyComponent.jsx
2. **Import in Page** → src/pages/HomePage.jsx
3. **Save** → Ctrl+S
4. **See Changes** → Automatically in browser
5. **Repeat**

---

## 💾 Build & Deploy Files

When building:
```bash
npm run build
```

Creates `dist/` folder with:
- Optimized JavaScript
- Processed CSS
- Minified code
- Tree-shaken unused code
- Production-ready files

---

## 🎉 Ready to Code!

All files are organized, documented, and ready to extend!

Start with: **QUICK_START.md**

Then explore: **DEVELOPMENT.md**

Happy coding! 🚀
