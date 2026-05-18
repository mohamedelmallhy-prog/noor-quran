# 👨‍💻 Development Guide

## 🎯 Getting Started with Development

### 1. Project Architecture

```
React Application
├── Pages (Full-screen views)
│   ├── HomePage (Landing + Features)
│   ├── ListenQuranPage (Audio Interface)
│   └── ReadQuranPage (Text Reader)
├── Components (Reusable UI pieces)
│   ├── Layout (Navbar, Sidebar)
│   ├── Sections (Hero, Features)
│   ├── Cards (Feature, Surah)
│   └── Interactive (Player, Reader, Buttons)
└── Utilities (Helpers, Constants)
```

### 2. Component Communication Flow

```
App (Router)
├── Sidebar (Menu Navigation)
├── Navbar (Top Navigation)
├── Page Content
│   ├── Hero Section
│   ├── Features Grid
│   └── CTA Section
└── ScrollToTop (Global Component)
```

## 🔄 Understanding State Management

Currently using **React Hooks** for state:
- `useState` for component state
- `useNavigate` for routing
- `useEffect` (ready for implementation)

### Example Component with State:
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="p-4"
    >
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </motion.div>
  );
}
```

## 🎨 Working with Animations

### Using Framer Motion

**Basic Animations:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}      // Start state
  animate={{ opacity: 1, y: 0 }}       // End state
  transition={{ duration: 0.5 }}       // Duration
>
  Animated content
</motion.div>
```

**Hover Effects:**
```jsx
<motion.button
  whileHover={{ scale: 1.1 }}          // On hover
  whileTap={{ scale: 0.95 }}           // On click
  transition={{ type: 'spring' }}      // Springy animation
>
  Interactive Button
</motion.button>
```

**Scroll Animations:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}   // Triggers on scroll into view
  viewport={{ once: true }}            // Only animate once
>
  Section that animates on scroll
</motion.div>
```

**Staggered Children:**
```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,          // Delay between children
        delayChildren: 0.2,
      }
    }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 🎨 Styling with Tailwind CSS

### Using Tailwind Classes

**Responsive Design:**
```jsx
<div className="
  w-full                    // Full width
  px-4 sm:px-6 lg:px-8      // Padding responsive
  grid grid-cols-1          // Default: 1 column
  md:grid-cols-2            // Medium: 2 columns
  lg:grid-cols-3            // Large: 3 columns
  gap-4 md:gap-6 lg:gap-8   // Gap responsive
">
  Content here
</div>
```

**Color Classes:**
```jsx
<div className="
  bg-dark-900               // Dark background
  text-gold-500             // Gold text
  border border-gold-500/20 // Semi-transparent border
  hover:bg-dark-800         // Hover state
  hover:border-gold-500/50  // Hover border
  transition-all            // Smooth transition
">
  Styled content
</div>
```

**Common Utilities:**
```jsx
<button className="
  px-6 py-3                 // Padding
  rounded-lg                // Border radius
  bg-gradient-to-r from-gold-500 to-gold-600  // Gradient
  text-dark-900 font-bold   // Text styling
  hover:shadow-lg           // Shadow
  transition-all            // Animation
  disabled:opacity-50       // Disabled state
">
  Button
</button>
```

## 📁 Adding New Components

### Step 1: Create Component File
Create `src/components/MyComponent.jsx`:

```jsx
import { motion } from 'framer-motion';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-dark rounded-xl p-6 border border-gold-500/20"
    >
      <h2 className="text-xl font-bold text-white">
        {prop1}
      </h2>
      <p className="text-gray-400">
        {prop2}
      </p>
    </motion.div>
  );
};

export default MyComponent;
```

### Step 2: Use in a Page
Import and use in `src/pages/HomePage.jsx`:

```jsx
import MyComponent from '../components/MyComponent';

export default function HomePage() {
  return (
    <div>
      <MyComponent 
        prop1="Title"
        prop2="Description"
      />
    </div>
  );
}
```

## 📄 Adding New Pages

### Step 1: Create Page File
Create `src/pages/NewPage.jsx`:

```jsx
import { motion } from 'framer-motion';
import FloatingBackButton from '../components/FloatingBackButton';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <FloatingBackButton />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          New Page Title
        </h1>
        
        {/* Your content here */}
      </motion.main>
    </div>
  );
};

export default NewPage;
```

### Step 2: Add Route
Update `src/App.jsx`:

```jsx
import NewPage from './pages/NewPage';

// Inside Routes component:
<Route path="/new-page" element={<NewPage />} />
```

### Step 3: Add Navigation Link
Update `src/components/Sidebar.jsx`:

```jsx
const menuItems = [
  // ... existing items
  { icon: Star, label: 'New Page', href: '/new-page', id: 'new-page' },
];
```

## 🔄 API Integration

### Fetching Data Example

```jsx
import { useState, useEffect } from 'react';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.quran.com/v1/chapters');
      const data = await response.json();
      setSurahs(data.chapters);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {surahs.map(surah => (
        <div key={surah.id}>{surah.name}</div>
      ))}
    </div>
  );
};

export default SurahList;
```

## 🧪 Best Practices

### 1. **Component Structure**
```jsx
// Import dependencies
import React from 'react';
import { motion } from 'framer-motion';

// Define component
const MyComponent = ({ title, children }) => {
  // State management
  // const [state, setState] = useState();

  // JSX return
  return (
    <motion.div>
      <h1>{title}</h1>
      {children}
    </motion.div>
  );
};

// Export component
export default MyComponent;
```

### 2. **Responsive Behavior**
Always think mobile-first:
```jsx
<div className="
  w-full
  px-4 sm:px-6 lg:px-8         // Add padding on larger screens
  text-base sm:text-lg lg:text-xl  // Increase text size
  grid-cols-1 md:grid-cols-2   // Add columns on larger screens
">
```

### 3. **Accessibility**
```jsx
<button 
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  Menu
</button>
```

### 4. **Performance Optimization**
```jsx
// Use memo for expensive components
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* render */}</div>;
});

export default ExpensiveComponent;
```

## 🐛 Debugging Tips

### 1. **React DevTools**
- Install React DevTools browser extension
- Inspect component tree
- Check props and state

### 2. **Console Logging**
```jsx
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);
```

### 3. **Breakpoints**
In browser DevTools > Sources tab, click line number to add breakpoint.

### 4. **Network Tab**
Check API calls, response times, and errors.

## 🎯 Common Tasks

### Change Color Scheme
1. Edit `tailwind.config.js`
2. Update `colors.gold` and `colors.dark`
3. Update CSS variables in `index.css`

### Add New Animation
1. Add keyframes to `tailwind.config.js`
2. Use in className: `animate-your-animation`

### Add New Font Size
1. Edit `fontSize` in `tailwind.config.js`
2. Use: `text-your-size`

### Modify Spacing
1. Edit `tailwind.config.js` spacing
2. Use: `p-4` (padding), `m-4` (margin), `gap-4` (gap)

## 📚 Useful Resources

### Documentation
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

### Tools
- [React DevTools](https://react-devtools-tutorial.vercel.app/)
- [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

## 🚀 Performance Tips

### 1. **Lazy Load Components**
```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. **Memoize Components**
```jsx
import { memo } from 'react';

const MemoizedComponent = memo(({ id, title }) => {
  return <div>{title}</div>;
});

export default MemoizedComponent;
```

### 3. **Use Callbacks**
```jsx
import { useCallback } from 'react';

const Parent = () => {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return <Child onClick={handleClick} />;
};
```

## 🎨 Responsive Image Handling

```jsx
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

## 💾 State Management Tips

### Use Context for Global State
```jsx
import { createContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

**Happy Coding! 🎉 Feel free to experiment and customize!**
