# BuddhiVoice - AI-Powered Omni-Channel Business Communication Platform

A cutting-edge, frontend-only AI-powered omni-channel business communication platform built with React.js, Next.js, and Tailwind CSS. Inspired by Voxbay's design and functionality, BuddhiVoice provides a comprehensive solution for modern business communication needs.

## 🚀 Features

### Core Platform
- **AI-Powered Telephony**: Multi-Level IVR, Smart Call Routing, Seamless Connectivity
- **Intelligent Call Center**: Automated Routing, Real-Time Analytics, Agent Monitoring
- **Lead Management**: Smart Tracking, Activity Log, Automated Reminders
- **AI IVR**: Natural Language Processing, Conversational AI, Predictive Routing
- **BYOT Integration**: Bring Your Own Technology support across all devices
- **WhatsApp Business**: Official API integration with automated responses
- **Virtual Numbers**: Global coverage with local presence worldwide

### Technical Features
- **Modern UI/UX**: Glassmorphism design, dark mode, responsive layout
- **Advanced Animations**: Framer Motion powered smooth interactions
- **Real-time Analytics**: Chart.js powered dashboards and metrics
- **Interactive Elements**: Kanban boards, IVR demos, live monitoring
- **TypeScript**: Full type safety and modern development experience
- **API-Ready**: Components designed for easy backend integration

## 🎨 Design System

### Color Palette
- Primary Black: `#000000`
- Dark Red: `#3D0000`
- Red: `#950101`
- Bright Red: `#FF0000`

### Typography
- Google Sans font family
- Modern, clean typography hierarchy
- Responsive text scaling

### Components
- Glassmorphism cards with backdrop blur
- Smooth hover animations
- Consistent spacing and layout
- Mobile-first responsive design

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 18 with Next.js 14
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React for consistent iconography
- **Language**: TypeScript for type safety
- **Build Tool**: Next.js built-in bundler

## 📁 Project Structure

```
buddhivoice/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind directives
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main landing page
├── components/             # Reusable React components
│   ├── Header.tsx         # Navigation and header
│   ├── Hero.tsx           # Hero section with main tagline
│   ├── ClientCarousel.tsx # Client logos and testimonials
│   ├── ContactForm.tsx    # Contact form with all fields
│   ├── Dashboard.tsx      # Analytics dashboard with charts
│   ├── TelephonySection.tsx # Telephony features
│   ├── CallCenterSection.tsx # Call center management
│   ├── LeadManagementSection.tsx # Lead management with Kanban
│   ├── AIIVRSection.tsx   # AI IVR features and demo
│   ├── BYOTSection.tsx    # Bring Your Own Technology
│   ├── WhatsAppSection.tsx # WhatsApp Business integration
│   ├── VirtualNumbersSection.tsx # Virtual number services
│   └── Footer.tsx         # Footer with links and info
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd buddhivoice
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Components

### Hero Section
- Main tagline: "AI-Powered Omni-Channel Platform for Business Communication"
- Animated background elements
- Call-to-action buttons
- Feature highlights

### Contact Form
- Name, Company, Phone (+91 flag), Email, Location
- Service dropdown with all platform features
- Form validation and submission handling
- Responsive design with glassmorphism styling

### Dashboard
- Real-time analytics with Chart.js
- Call volume trends, agent performance
- Interactive charts and metrics
- Recent activity monitoring

### Interactive Features
- **Kanban Board**: Drag-and-drop lead management
- **IVR Demo**: Interactive IVR system demonstration
- **Live Monitoring**: Real-time agent and call status
- **Responsive Design**: Mobile-first approach

## 🎨 Customization

### Colors
Modify the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    black: '#000000',
    darkRed: '#3D0000',
    red: '#950101',
    brightRed: '#FF0000',
  }
}
```

### Animations
Customize animations in `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

### Components
All components are modular and can be easily customized:
- Modify props and interfaces
- Update styling classes
- Add new features and functionality

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Responsive across all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized animations and interactions

## 🔧 Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Modular component architecture

### Performance
- Lazy loading with Next.js
- Optimized animations
- Efficient re-renders
- Bundle optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Deploy automatically on push
3. Built-in CI/CD pipeline

### Other Platforms
- Netlify
- AWS Amplify
- Custom server

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: sales@buddhiai.io
- Phone: +91 93618 60665
- Location: Indranagar, Bangalore, India

## 🔮 Future Enhancements

- Backend API integration
- Real-time collaboration features
- Advanced AI capabilities
- Mobile app development
- Enterprise features
- Multi-language support

---

**BuddhiVoice** - Transforming Business Communication with AI-Powered Solutions
