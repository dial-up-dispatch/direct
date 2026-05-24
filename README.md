# Dispatch Direct // Registry Portal

> the browser sidebar arm of **dial up dispatch**, an indie developer research initiative.

This repository hosts the static landing site and registry deck for **Dispatch Direct**—a suite of browser sidebar tools focused on complete offline data sovereignty. 

Live at: **https://dial-up-dispatch.github.io/direct/**

---

## 📺 The Local Vow

Every tool documented and simulated here is built on a single, non-negotiable vow:

> **"Your data is always yours, always local, and always retrievable—even if this project disappeared tomorrow."**

*   **Zero Transit:** No databases, no sync servers, no telemetry, and no accounts. Everything runs locally in your browser sandbox on your CPU.
*   **Plain Portability:** Quick, readable backups (Markdown/plain text) so your data is never held hostage by proprietary file formats.
*   **Permanent Offline Execution:** Fully operational without network signals.

---

## 🛰️ Registry Satellites

1.  **Brain Dump Inbox (`v1.2.0`):** A local-first thought capture tool. Expiring pile logs, fast category filtering, and one-click markdown exports.
2.  **The Void (`v1.0.4`):** A private terminal release chamber. Type transient thoughts or mental clutter and release them to dissolve safely into absolute nothingness.
3.  **Future Seeds:** Idea-stage companion tools awaiting portal socket activation.

---

## 🛠️ Technology Stack

*   **Core:** React + TypeScript + Vite.
*   **Styling:** Tailwind CSS v4 (native compiler plugins) + Custom HSL Phosphor-Glow variables.
*   **Animations:** Framer Motion (for boot diagnostics, horizontal wipe sweeps, and staggered card entrances).
*   **Audio Synthesis:** Zero-dependency Web Audio API utilities (`src/utils/audio.ts`) synthesizing tactile typewriter key click sounds and sweep sweeps on user interaction.

---

## ⚡ Development & Deployment

### Local Setup
Ensure you have Node.js v20+ installed.

```bash
# Navigate to workspace
cd direct

# Install dependencies
npm install

# Run local development server
npm run dev
```

### Static Production Build
```bash
# Compile and optimize static assets to direct/dist/
npm run build
```

### Automated Actions Deployment
A GitHub Actions workflow (**[.github/workflows/deploy.yml](.github/workflows/deploy.yml)**) is integrated. Every push to the `main` branch automatically installs packages, runs the compiler, and deploys the optimized outputs (`direct/dist`) to your target `gh-pages` branch.
