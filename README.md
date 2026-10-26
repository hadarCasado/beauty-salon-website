# PureBeauty — Beauty Salon & Medical Cosmetics Landing Page

A modern, responsive Single Page Application (SPA) with a built-in Content Management System (CMS), built with **React**, **Vite**, and **Google Firebase**.

Designed as both a professional portfolio project and a customizable commercial template for beauty salons and other service-based businesses. It combines a conversion-focused Hebrew (RTL) landing page with a secure, real-time admin dashboard for lead management and content updates.

---

## 🚀 Live Demo

**[beauty-salon-demo-website-ten.vercel.app](https://beauty-salon-demo-website-ten.vercel.app)**

| Page | URL |
| --- | --- |
| Landing page | [`/`](https://beauty-salon-demo-website-ten.vercel.app) |
| Admin dashboard | [`/?admin=true`](https://beauty-salon-demo-website-ten.vercel.app/?admin=true) |

### 🔑 Demo Admin Access

To explore the admin dashboard, sign in at [`/?admin=true`](https://beauty-salon-demo-website-ten.vercel.app/?admin=true) with:

| Email | Password |
| --- | --- |
| `demo@purebeauty.com` | `Demo1234!` |

> This is a public demo account — data may be reset periodically.

---

## Key Features

### Client-Facing Landing Page

- **Config-driven architecture** — Branding, color palette, hero content, services and contact details are centralized in a single configuration file, so the site can be rebranded for a new client in minutes.
- **Lead capture with WhatsApp integration** — Contact form submissions are saved to **Cloud Firestore** and a pre-filled **WhatsApp** message is generated automatically for immediate follow-up.
- **Dynamic content with fallback** — The testimonials carousel and FAQ accordion load their data from Firestore and fall back to the default configuration data when it is unavailable.
- **RTL-first and fully responsive** — Built for Hebrew from the ground up, with fluid layouts, a responsive navigation bar and a legal/accessibility compliance modal.

### Secure Admin Dashboard (`/?admin=true`)

- **Firebase Authentication** — Protected admin area with email/password sign-in and password reset.
- **CRM and lead management**
  - Real-time list of customer inquiries, sorted by submission time.
  - Adaptive layout: a detailed data table on desktop and touch-friendly cards on mobile.
  - One-click status toggle (**New** / **Handled**) with a live badge showing unhandled leads.
  - Quick actions to reply on WhatsApp, call the customer, or delete the record.
- **Live content management** — Full CRUD (Create, Read, Update, Delete) for testimonials and FAQs, with changes reflected on the live site immediately.

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | React, JavaScript (ES6+), HTML5, CSS3 |
| Build tool | Vite |
| Backend / BaaS | Firebase — Cloud Firestore, Firebase Authentication |
| Deployment | Vercel |
| Design & tooling | Figma, Canva, Git & GitHub |

---

## 📂 Project Structure

```text
src/
├── assets/                     # Images and branding assets
├── components/
│   ├── Admin/                  # Admin CMS & CRM modules
│   │   ├── AdminDashboard.jsx  # Dashboard state and tab management
│   │   ├── AdminLogin.jsx      # Sign-in and password reset
│   │   ├── LeadsMobileList.jsx # Lead cards (mobile view)
│   │   └── LeadsTable.jsx      # Lead table (desktop view)
│   ├── Contact.jsx             # Lead capture form & WhatsApp redirect
│   ├── FAQ.jsx                 # FAQ accordion
│   ├── Navbar.jsx              # Responsive navigation bar
│   ├── Services.jsx            # Services grid and pricing
│   └── Testimonials.jsx        # Customer reviews carousel
├── config/                     # Firebase and business configuration
├── App.jsx                     # Root component and routing
└── main.jsx                    # Application entry point
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended) and npm
- A [Firebase](https://firebase.google.com/) project with **Cloud Firestore** and **Email/Password Authentication** enabled

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/hadarCasado/beauty-salon-website.git
   cd beauty-salon-website
```

2. **Install dependencies**

```bash
   npm install
```

3. **Configure Firebase**

   Add your Firebase project credentials to the Firebase configuration file in `src/config/`, and create an admin user in the Firebase Console under **Authentication → Users**.

4. **Start the development server**

```bash
   npm run dev
```

5. **Open the app in your browser**

   - Landing page: [http://localhost:5173](http://localhost:5173)
   - Admin dashboard: [http://localhost:5173/?admin=true](http://localhost:5173/?admin=true)

### Production Build

```bash
npm run build     # Build for production into the dist/ folder
npm run preview   # Preview the production build locally
```

---

## Customization

To adapt the template for a new business, edit the business configuration file in `src/config/`: brand name, colors, hero text, services and prices, contact details and the WhatsApp number. No changes to the components are required.

---

## Author

**Hadar Casado** — [GitHub](https://github.com/hadarCasado)