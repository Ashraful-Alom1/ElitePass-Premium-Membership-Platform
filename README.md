# ✦ ElitePass — Premium Membership Platform

A stunning, glassmorphism-powered membership platform with GSAP animations, interactive dashboard, AI concierge, and certificate generation.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🚀 Live Demo

Deploy your own in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ashraful-Alom1/ElitePass-Premium-Membership-Platform)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 📁 Project Structure

```
├── index.html        # Main HTML (single-page app)
├── styles.css        # Full design system & responsive styles
├── script.js         # App logic, auth, dashboard, payments
├── animations.js     # GSAP scroll & magnetic animations
├── vercel.json       # Vercel deployment config
├── render.yaml       # Render deployment blueprint
├── .env.example      # Environment variable template
└── .gitignore        # Keeps secrets & temp files out of git
```

## 🛡️ Security — No Secret Leaks

This is a **static frontend** project — no server-side secrets are stored in the code.

| Safety Measure | Status |
|---|---|
| `.gitignore` blocks `.env`, `node_modules`, IDE files | ✅ |
| No API keys or secrets hardcoded in source | ✅ |
| `.env.example` documents variable usage | ✅ |
| Security headers set via `vercel.json` / `render.yaml` | ✅ |

> **If you add a backend later**, store secrets (Stripe keys, DB passwords) in the hosting platform's **Environment Variables** dashboard — never in code.

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects static site — click **Deploy**
5. Add any env vars in **Settings → Environment Variables**

## 🌐 Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New → Static Site**
3. Connect your GitHub repo
4. Render reads `render.yaml` automatically — click **Deploy**
5. Add any env vars in **Environment** tab

## 🧪 Demo Login

```
Email:    demo@elitepass.com
Password: demo1234
```

## ✨ Features

- Glassmorphism 2.0 design with premium dark theme
- GSAP-powered scroll animations & magnetic hover effects
- Interactive pricing toggle (monthly/annual)
- Multi-step registration with live card preview
- Full member dashboard with analytics charts
- AI Concierge chat widget
- Downloadable membership certificate
- Responsive across all devices

## 📄 License

MIT © Ashraful Alom
