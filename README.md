# Pulse - Status Monitoring
![Pulse](/src/app/icon.svg)

**Pulse** is a warm, friendly, and professional status monitoring dashboard. Think of it as a "Status Page" that feels like a "Farewell Message Board" — calm, trustworthy, and visually appealing.

## 🚀 Features

*   **Warm Design System**: Custom vanilla CSS variables for a premium, non-generic look.
*   **Real-time Monitoring**: Checks HTTP status and response time server-side.
*   **Auto-Refresh**: Automatically pings sites every 60 seconds (`pulse_sites` in localStorage).
*   **SSL & Availability**: Simple visual indicators for SSL and latency.
*   **Admin Mode**: 
    *   Secure login (Password: `admin`).
    *   **Drag & Drop** reordering of monitors.
    *   Add/Remove monitors with custom confirmation modals.
*   **Responsive**: Works on desktop, tablet, and mobile.

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Vanilla CSS Variables (Tokens) & CSS Modules
*   **Library**: `lucide-react` (Icons), `@dnd-kit` (Drag & Drop)
*   **Deployment**: Vercel Ready (Server Actions + LocalStorage)

## 📦 Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000).

## 🚀 Deployment on Vercel

This project is optimized for **Vercel**.

1.  Push this code to your GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Import Project".
3.  Select your repository and click **Deploy**.
4.  No environment variables needed for basic usage.

## 🤝 Purpose

Built as a portfolio showcase to demonstrate:
*   Clean Architecture (Separation of Concerns)
*   Modern UI/UX (Glassmorphism, Micro-interactions)
*   Server Actions & Next.js App Router patterns.
