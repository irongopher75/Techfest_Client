# 💎 Ambiora Client

The high-performance, premium frontend for **Ambiora 2026'**, the annual technical festival of NMIMS MPSTME, Shirpur. Built with a focus on cutting-edge aesthetics, responsiveness, and seamless user experience.

## ✨ Core Features

### 🎮 User Experience
- **Glassmorphism Design System**: A sleek, futuristic UI with vibrant neon accents and frosted-glass effects.
- **Dynamic HUD**: Interactive HUD elements and scanline animations for a high-tech "terminal" feel.
- **Micro-Animations**: Smooth transitions and hover effects using CSS variables and keyframes.
- **Toast Notifications**: Non-blocking, real-time feedback using `react-hot-toast`.

### 🛡️ Secure Navigation
- **Role-Based Routing**: Dedicated protected routes for **Users**, **Event Admins**, and **Superior Admins**.
- **Smart Redirects**: Automatic navigation to `/logged-out` on session expiry or logout to ensure session integrity.
- **Scroll Management**: Integrated `ScrollToTop` behavior on every route change.

### ⚡ Performance & State
- **TanStack Query (React Query)**: 
    - Intelligent caching for events and registrations.
    - Zero-lag navigation between tabs.
    - Automatic background revalidation.
- **Lazy Loading**: Admin dashboards are lazily loaded to minimize initial bundle size and boost page speed.
- **Axios Interceptors**: Centralized API handling with automatic token injection and 401 challenge Handling.

### 👨‍💼 Administrative Consoles
- **Superior Dashboard**: 
    - Global overview of all registrations.
    - **Server-Side Pagination** for infinite lists without browser lag.
    - Transaction verification (UPI UTR Validation).
    - Event management (Create/Update/Delete).
- **Event Admin Console**: 
    - Focused view for specific assigned events.
    - Participant list management and registration tracking.

## 🛠️ Tech Stack
- **Library**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State/Data**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Modern Variable System)
- **API Client**: Axios

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   ```

3. **Development Mode**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

## 🔗 Project Links
- **Backend API**: [Ambiora Server](../Techfest_Server/README.md)
- **Live Deployment**: [techfestmpstme](https://techfestmpstme.netlify.app)

---
*Created with ❤️ by Vishnu Panicker for Ambiora 2026*
