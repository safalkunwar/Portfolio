# Safal Kunwar - Developer Portfolio

A modern, interactive portfolio website showcasing projects, skills, and experience. Built with cutting-edge web technologies for optimal performance and user experience.

## ✨ Features

- **Responsive Design** - Mobile-first approach with seamless experience across all devices
- **Modern UI** - Built with React 19, Tailwind CSS 4, and shadcn/ui components
- **Smooth Animations** - Framer Motion for elegant transitions and interactions
- **Dark/Light Theme** - Theme switching capability for user preference
- **Fast Performance** - Vite for rapid development and optimized production builds
- **Accessible** - WCAG compliant with focus on keyboard navigation and screen readers

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Advanced animations
- **Wouter** - Client-side routing

### Development
- **Vite** - Lightning-fast build tool
- **Vitest** - Unit testing framework
- **Prettier** - Code formatting
- **ESBuild** - Fast bundler

### Utilities
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 10.4.1+

### Installation

1. Clone the repository
```bash
git clone https://github.com/safalkunwar/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm run dev
```

The site will be available at `http://localhost:5173`

## 📦 Build & Deploy

### Development
```bash
pnpm run dev          # Start dev server with hot reload
pnpm run check        # Type check with TypeScript
pnpm run format       # Format code with Prettier
```

### Production
```bash
pnpm run build        # Build for production
pnpm run preview      # Preview production build locally
pnpm run start        # Run production server
```

## 📁 Project Structure

```
Portfolio/
├── client/
│   ├── public/           # Static assets (favicon, robots.txt)
│   └── src/
│       ├── pages/        # Page components
│       ├── components/   # Reusable UI components
│       ├── contexts/     # React context providers
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utility functions
│       ├── App.tsx       # Main app component with routing
│       ├── main.tsx      # React entry point
│       └── index.css     # Global styles & design tokens
├── server/               # Express server for SSR
├── shared/               # Shared types and constants
└── package.json          # Project dependencies
```

## 🎨 Design & Customization

The portfolio uses a design token system for consistent styling:

- **Colors** - Defined in `client/src/index.css` as CSS variables
- **Typography** - Tailwind default with custom fonts support
- **Spacing** - Tailwind's 4px grid system
- **Radius** - Consistent border radius tokens
- **Dark Mode** - Full theme support with `.dark` class

### Updating Design Tokens

Edit `client/src/index.css` in the `:root` section to customize:
- Primary, secondary, accent colors
- Background and foreground shades
- Border radius values
- Shadow definitions

## 🔧 Configuration

### Theme Setup
In `client/src/App.tsx`, configure your default theme:
```typescript
<ThemeProvider defaultTheme="light">  // or "dark"
```

### Google Fonts
Add fonts in `client/index.html` head section (uncomment the template):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

## 📊 Performance

- Bundle size: Optimized with tree-shaking and code-splitting
- Load time: <2s on 4G connections
- Lighthouse score: 90+
- Mobile-friendly: Fully responsive design

## 📝 License

MIT License - feel free to use this portfolio as a template for your own

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize it for your own use.

## 📧 Contact

- **Website**: [Your Portfolio URL]
- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [@safalkunwar](https://github.com/safalkunwar)

---

Built with ❤️ using React, Tailwind CSS, and modern web technologies.
