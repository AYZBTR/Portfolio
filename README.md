# Portfolio + Admin Dashboard (MERN + TypeScript)

A modern, production-style portfolio website with a secure admin panel for managing projects and site content. Built with a focus on clean UI/UX, real-world CRUD workflows, protected routes, and scalable structure.

> **Why this matters:** This is not a static template — it’s a full stack app with authentication, admin-only content management, and a structured codebase that mirrors real product development.

---

## Highlights (What a recruiter should notice)

### ✅ Real Admin CMS workflow
- Admin login
- Create / edit / delete projects
- Admin dashboard UI for managing content
- Admin-only route protection (blocks access before rendering the UI)

### ✅ Modern frontend engineering
- React + TypeScript
- Component-driven UI
- Responsive layouts (mobile + desktop)
- Smooth section navigation & modern styling (Tailwind)
- Preview cards & reusable UI patterns

### ✅ Full-stack CRUD + API integration
- Frontend consumes an API for projects + settings
- Token-based requests for protected actions
- Clean separation of concerns: pages, layouts, services, route config

### ✅ Security & maintainability focus
- Protected admin routes using a route-guard component
- Centralized admin route config (`ADMIN_ROUTES`)
- Clean patterns that scale as features grow

---

## Tech Stack

**Frontend**
- React + TypeScript
- React Router
- Tailwind CSS
- lucide-react icons

**Backend (if applicable)**
- Node.js / Express
- MongoDB + Mongoose
- Auth (Clerk / token-based auth flow)

---
## File Uploads (Cloudinary + Multer)

This project supports image uploads for site/hero content using a secure backend upload pipeline.

### How uploads work (end-to-end)
1. **Frontend** selects an image and sends it as `multipart/form-data`
2. Backend receives the file using **Multer** (`memoryStorage`) so the file is available as `req.file.buffer`
3. Backend streams the buffer directly to **Cloudinary** using `cloudinary.uploader.upload_stream`
4. API returns the hosted Cloudinary URL back to the frontend for storing in settings / UI rendering

### Tools / libraries used
- **multer** (multipart form parsing, memory storage)
- **cloudinary** (image hosting)
- **streamifier** (turns in-memory buffer into a readable stream for Cloudinary)

### API route
- `POST /uploads` (protected)
  - Requires authentication (admin)
  - Accepts: `file` field in FormData
  - Returns: `{ url }` (Cloudinary secure URL)

### Backend configuration
The Cloudinary SDK is configured from environment variables:

```env
CLOUDINARY_CLOUD_NAME=xxxxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx
```

> Note: Upload size is limited (configured via Multer) to prevent oversized uploads.
## Project Structure (Frontend)

```txt
frontend/src/
  components/        # reusable UI components (Navbar, AdminRoute, etc.)
  config/            # route constants and app configuration
  layouts/           # Main layout wrappers (Outlet-based)
  pages/             # route-level pages (Home, ProjectDetail, Admin pages)
  services/          # API client layer
```

---

## Key Features (Detailed)

### Admin Panel
- Dashboard to manage portfolio projects
- CRUD operations:
  - **CreateProject**
  - **EditProject**
  - **DeleteProject**
- Settings screen for site configuration (if enabled)

### Routing Design
- Public website routes (`/`, `/projects/:id`)
- Admin login route
- Admin protected routes behind `AdminRoute`
- Shortcut route:
  - `/admin` → redirects to the admin login route (easy access while developing)

---

## Getting Started (Local Setup)

### 1) Clone
```bash
git clone https://github.com/AYZBTR/Portfolio.git
cd Portfolio
```

### 2) Install dependencies

If you have a single root install:
```bash
npm install
npm run dev
```

If frontend is separate:
```bash
cd frontend
npm install
npm run dev
```

### 3) Environment Variables
Create `.env` files as needed (frontend/backend). Example keys you may require:
- API base URL
- authentication keys (Clerk)
- database connection string (backend)

> **Note:** For security, never commit secrets to GitHub.

---

<h2>Screenshots</h2>

<h3>Landing Page</h3>
<p align="center">
  <img src="./screenshots/Landing%20Page.png" width="900" alt="Landing Page" />
</p>

<h3>Projects Section</h3>
<p align="center">
  <img src="./screenshots/Projects%20Section.png" width="900" alt="Projects Section" />
</p>

<h3>About Me Section</h3>
<p align="center">
  <img src="./screenshots/About%20me%20section.png" width="900" alt="About me section" />
</p>

<h3>Contact</h3>
<p align="center">
  <img src="./screenshots/Contact%20me.png" width="900" alt="Contact me" />
</p>

<h3>Admin Dashboard</h3>
<p align="center">
  <img src="./screenshots/Admin%20Dashboard.png" width="900" alt="Admin Dashboard" />
</p>

<h3>Add New Project (Admin)</h3>
<p align="center">
  <img src="./screenshots/Add%20New%20Project.png" width="900" alt="Add New Project" />
</p>

<h3>Edit Project (Admin)</h3>
<p align="center">
  <img src="./screenshots/Edit%20project.png" width="900" alt="Edit project" />
</p>

<h3>Site Settings (Admin)</h3>
<p align="center">
  <img src="./screenshots/Site%20Settings.png" width="900" alt="Site Settings" />
</p>

<h3>Sign out + Login Page</h3>
<p align="center">
  <img src="./screenshots/signout%20and%20login%20page.png" width="900" alt="signout and login page" />
</p>

---

## What I Learned / Engineering Decisions

- Designed a clean route architecture (public vs admin routes)
- Implemented route guarding to prevent unauthorized UI rendering
- Built admin CRUD flows similar to real CMS dashboards
- Improved UI responsiveness and content preview patterns for better readability
- Focused on maintainable structure (services/config/layout separation)

---



---

## Contact
If you'd like to discuss the project or see a walkthrough:

- Name: **Ayush**
- GitHub: https://github.com/AYZBTR
- Portfolio: https://aayushbhattarai78.com.np/
- Email / LinkedIn: https://www.linkedin.com/in/ayzbtr/
