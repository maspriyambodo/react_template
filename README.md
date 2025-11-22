# Admin Dashboard Template

A modern, secure, and feature-rich admin dashboard built with React Router v7, Tailwind CSS, advanced charts, and data grid components.

## Features

### Core Features
- ✅ **React Router v7** - Latest routing with nested routes and protected routes
- ✅ **Tailwind CSS** - Modern utility-first CSS framework with dark mode support
- ✅ **Advanced Charts** - Beautiful, responsive charts using Recharts (Line, Bar, Area, Pie, Radar, Scatter)
- ✅ **Data Grid** - Powerful AG Grid with sorting, filtering, pagination, and CSV export
- ✅ **API Integration** - Axios with interceptors, error handling, and request/response transformation
- ✅ **Form Validation** - React Hook Form with Zod schema validation
- ✅ **State Management** - Zustand for lightweight, efficient state management

### Security Features
- 🔒 **Authentication** - JWT-based authentication with protected routes
- 🔒 **Input Sanitization** - XSS prevention through input sanitization
- 🔒 **CSRF Protection** - CSRF token support in API requests
- 🔒 **Content Security Policy** - CSP headers configured in index.html
- 🔒 **Secure Storage** - Encrypted local storage for auth tokens

### Performance Optimizations
- ⚡ **Code Splitting** - Lazy loading of route components
- ⚡ **Memoization** - React.memo and useMemo for expensive computations
- ⚡ **Bundle Optimization** - Vite with manual chunk splitting
- ⚡ **Tree Shaking** - Automatic removal of unused code

### UI/UX Features
- 🎨 **Dark Mode** - Persistent theme switching with system preference detection
- 📱 **Responsive Design** - Mobile-first design with collapsible sidebar
- 🎯 **Clean Code** - Well-organized, maintainable codebase
- 🔄 **Error Boundaries** - Graceful error handling with user-friendly messages
- 📊 **Rich Components** - Pre-built reusable components (Button, Card, Input, etc.)

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router DOM 7.0
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 5.0
- **Charts**: Recharts 2.15
- **Data Grid**: AG Grid 32.3
- **Form Management**: React Hook Form 7.54
- **Validation**: Zod 3.24
- **HTTP Client**: Axios 1.7
- **Icons**: Lucide React 0.468
- **Build Tool**: Vite 6.0

## Project Structure

```
adminfe/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Input.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Analytics.jsx
│   │   ├── DataGrid.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── store/
│   │   ├── useAuthStore.js
│   │   └── useThemeStore.js
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 24 and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd adminfe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Login

The application includes a mock authentication system. Use any email and password (minimum 6 characters) to log in.

**Demo Credentials:**
- Email: admin@example.com
- Password: password123

### Navigation

- **Dashboard**: Overview with charts and statistics
- **Users**: CRUD operations with search and modal forms
- **Analytics**: Advanced charts (Composed, Radar, Scatter)
- **Data Grid**: Sortable, filterable table with export functionality
- **Settings**: User profile and preferences management

## API Integration

The application uses JSONPlaceholder API for demo data. To integrate with your own backend:

1. Update the `baseURL` in `src/utils/api.js`
2. Implement proper authentication endpoints
3. Update API calls in pages to match your API structure

## Security Best Practices

1. **Authentication**: Replace mock authentication with real JWT-based auth
2. **Environment Variables**: Store sensitive data in `.env` files
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Input Validation**: Server-side validation in addition to client-side
6. **CORS**: Configure CORS properly on your backend

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Add New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

## Performance Tips

- Use React.memo for components that render frequently
- Implement virtualization for large lists (react-window)
- Optimize images with proper formats and lazy loading
- Monitor bundle size with `npm run build -- --analyze`

## Docker Support

This project includes comprehensive Docker support with Nginx reverse proxy for both development and production environments.

### Quick Start

```bash
# Development with HMR and Nginx
docker-compose -f docker-compose.dev.yaml up --build

# Production build with optimizations
docker-compose -f docker-compose.prod.yaml up --build
```

### Features

**Development Environment:**
- Vite dev server with Hot Module Replacement (HMR)
- Nginx reverse proxy with WebSocket support
- Live code updates via volume mounting
- Security headers and rate limiting

**Production Environment:**
- Multi-stage optimized build
- Static file serving with Nginx
- Gzip compression
- Health checks
- API proxy caching
- SSL/HTTPS ready

See [DOCKER.md](./DOCKER.md) for detailed Docker documentation, including:
- Setup instructions
- SSL/HTTPS configuration
- Troubleshooting guide
- Performance optimization
- Security best practices
- Monitoring and scaling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this template for your projects.

## Support

For issues and questions, please open an issue on GitHub.
