# 🕌 Quran Premium - Modern Islamic Platform

A luxurious, modern, and fully responsive Quran website built with React, Tailwind CSS, and Framer Motion. Designed to feel like a world-class Islamic platform with premium UI/UX.

## ✨ Features

### 🎨 Premium Design
- **Luxury Dark Theme** with golden accents
- **Glassmorphism UI** for modern aesthetic
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** across all devices (Mobile, Tablet, Desktop)
- **High-End Typography** and spacing

### 🧭 Navigation
- **Collapsible Sidebar** with hamburger menu
- **Smooth Animations** for menu transitions
- **Active Link Highlighting** for better UX
- **Floating Back Button** on audio/read pages
- **Smooth Page Transitions** between routes

### 📖 Core Features
- **Listen to Quran** - Beautiful audio player with reciter selection
- **Read Quran** - Classic Arabic text with translations
- **Popular Surahs** - Grid view of most recited chapters
- **Scroll to Top Button** - Smooth scroll animation
- **Sound Wave Animation** - Visual feedback during playback

### 🚀 Performance
- **Fast Loading** with Vite bundler
- **Lazy Loading** for images and components
- **Optimized CSS** with Tailwind
- **Clean Component Architecture**
- **Production-Ready** code

## 📁 Project Structure

```
noirframe/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx              # Collapsible navigation sidebar
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── HeroSection.jsx           # Premium hero with animations
│   │   ├── FeatureCard.jsx           # Feature showcase cards
│   │   ├── SurahGrid.jsx             # Surahs grid display
│   │   ├── AudioPlayer.jsx           # Audio player controls
│   │   ├── SoundWaveAnimation.jsx    # Sound wave visual effect
│   │   ├── AyahReader.jsx            # Ayah text reader
│   │   ├── FloatingBackButton.jsx    # Floating back navigation
│   │   └── ScrollToTop.jsx           # Scroll to top button
│   ├── pages/
│   │   ├── HomePage.jsx              # Landing page with hero
│   │   ├── ListenQuranPage.jsx       # Audio listening page
│   │   └── ReadQuranPage.jsx         # Quran reading page
│   ├── App.jsx                       # Main app component
│   ├── index.jsx                     # React entry point
│   └── index.css                     # Global styles & animations
├── index.html                        # HTML entry point
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🎯 UI/UX Features

### Hero Section
- Full viewport coverage (100vh)
- Animated background gradients
- Floating particle effects
- Smooth scroll indicator
- Responsive text scaling

### Sidebar
- Hidden by default (mobile-first)
- Smooth slide animation from left
- Dark blurred backdrop overlay
- Closes on outside click
- Sticky top with branding

### Audio Player
- Progress bar with time display
- Volume control slider
- Skip buttons for navigation
- Play/Pause toggle
- Reciter information display

### Reader
- Adjustable font sizes (sm, base, lg, xl)
- Multiple language support (Arabic, English, Urdu)
- Interactive verse selection
- Copy/Share/Listen buttons per verse
- Sticky sidebar navigation

### Interactive Elements
- Hover lift effects on cards
- Golden glow animations
- Smooth transitions on all interactions
- Loading animations
- Page fade transitions

## 🛠️ Technologies Used

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Framer Motion** - Premium animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool
- **PostCSS** - CSS processing

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Optimized layout with hamburger menu
- **Tablet** (640px - 1024px): Improved spacing and sizing
- **Desktop** (> 1024px): Full featured layout
- **Large Screens** (> 1536px): Enhanced spacing

## 🎨 Color Palette

### Gold Theme
- Primary: `#d4a574` (Gold 500)
- Dark Background: `#0f0f0f` (Dark 900)
- Secondary Background: `#1a1a1a` (Dark 800)
- Accent: `#282828` (Dark 700)

### Gradients
- **Gold Gradient**: from-gold-500 to-gold-600
- **Glass Effect**: rgba(255, 255, 255, 0.1) with backdrop blur

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to project folder:
```bash
cd noirframe
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🎬 Animation Capabilities

- Fade-in animations for page loads
- Slide transitions for sidebar
- Hover lift effects on interactive elements
- Golden glow pulse animations
- Sound wave real-time animation
- Floating particle background
- Smooth scroll behavior
- Page transition animations
- Staggered children animations

## 📦 Component Breakdown

### Navbar
- Logo with Islamic branding
- Search functionality
- Notification bell
- User profile avatar
- Menu toggle button

### Sidebar
- Collapsible navigation menu
- Menu items with hover effects
- Favorites section
- Settings link
- Share button
- Footer branding

### Hero Section
- Full viewport height
- Animated gradient background
- Animated orbs and particles
- Grid pattern overlay
- CTA buttons
- Statistics display
- Scroll indicator

### Feature Cards
- Glassmorphic design
- Icon with gradient background
- Hover animations
- Arrow indicator
- Link integration

### Audio Player
- Custom progress bar
- Volume control
- Play/Pause/Skip controls
- Time display
- Reciter info
- Format display

### Reader Interface
- Arabic text display (RTL)
- English translations
- Urdu translations
- Font size controls
- Language selector
- Interactive verse cards
- Copy/Share/Listen actions

## ✅ Best Practices Implemented

✓ Component Reusability
✓ Separation of Concerns
✓ Performance Optimization
✓ Mobile-First Design
✓ Accessibility Considerations
✓ Clean Code Structure
✓ Meaningful Naming Conventions
✓ Responsive Typography
✓ Smooth Animations
✓ Error Handling Ready

## 🔮 Future Enhancements

- [ ] Real Quranic API integration
- [ ] User authentication system
- [ ] Bookmarks and favorites sync
- [ ] Offline mode with service workers
- [ ] Multiple Qari voices
- [ ] Verse-by-verse translations
- [ ] Dark/Light theme toggle
- [ ] Search functionality
- [ ] Share to social media
- [ ] Mobile app (React Native)

## 📖 Usage Examples

### Adding a New Component
```jsx
import { motion } from 'framer-motion';

const NewComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-dark rounded-xl p-6"
    >
      Content here
    </motion.div>
  );
};
```

### Using Animations
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="premium-button"
>
  Click Me
</motion.button>
```

### Responsive Classes
```jsx
<div className="
  text-base sm:text-lg md:text-xl lg:text-2xl
  px-4 sm:px-6 lg:px-8
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Responsive Content
</div>
```

## 🎨 Customization Guide

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  gold: {
    500: '#your-color-here'
  }
}
```

### Modify Font Size
Edit `tailwind.config.js` fontSize extension

### Adjust Animation Speed
Modify transition durations in component files

## 📞 Support

For issues or questions, please create an issue in the project repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for the Islamic Community**

*Experience the divine words through modern technology*
