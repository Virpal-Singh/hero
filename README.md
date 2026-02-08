# MyHero - Scroll-Driven Animation

A production-ready Next.js web application featuring a cinematic scroll-driven frame-by-frame animation using 240 sequential images.

## 🎬 Features

- **Scroll-Based Animation**: 240 frames of smooth anime nature animation
- **Canvas Rendering**: High-performance rendering using HTML5 Canvas
- **Intelligent Preloading**: All images preloaded with progress indicator
- **Smooth Transitions**: 60fps animation with requestAnimationFrame
- **Dynamic Scale Effect**: Subtle zoom-in effect as you scroll
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Theme**: Immersive experience with custom scrollbar

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
myhero/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Home page
│   ├── page.module.css    # Page styles
│   └── globals.css        # Global styles
├── components/
│   ├── HeroAnimation.js   # Main animation component
│   └── HeroAnimation.module.css
├── public/
│   └── images/            # 240 sequential images
│       └── ezgif-frame-*.jpg
├── package.json
├── next.config.js
└── jsconfig.json
```

## 🎨 How It Works

### Image Preloading
All 240 images are preloaded on component mount with a progress indicator showing loading status (0-100%).

### Scroll-to-Frame Mapping
```javascript
scrollProgress = scrollY / (documentHeight - viewportHeight)
frameIndex = Math.floor(scrollProgress * 239)
```

### Canvas Rendering
- Images are drawn on an HTML5 canvas element
- Maintains aspect ratio while covering viewport
- Updates in sync with scroll using requestAnimationFrame

### Performance Optimizations
- **Canvas rendering**: Direct pixel manipulation, no DOM reflows
- **RequestAnimationFrame**: Synced with browser refresh rate
- **Passive scroll listeners**: Non-blocking scroll events
- **Image caching**: Preloaded images stored in memory
- **GPU-accelerated transforms**: CSS scale effect

## 🎯 Technical Details

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: CSS Modules
- **Total Frames**: 240
- **Animation Type**: Scroll-driven frame sequence
- **Rendering**: HTML5 Canvas

## 🌟 UX Features

- Loading screen with animated spinner
- Progress bar showing image load status
- Scroll indicator with bounce animation
- Smooth scale effect (1.0 → 1.1)
- Custom dark-themed scrollbar
- Text selection disabled for immersive experience
- Reduced motion support

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Animation frames created from sequential image export.
