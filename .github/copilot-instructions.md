# Portfolio Project - Copilot Instructions

## Architecture Overview
Monorepo with separate **frontend** (React + Vite + TypeScript) and **backend** (Express + TypeScript) applications:
- **Frontend**: React 19, React Router, Tailwind CSS v4, Locomotive Scroll, GSAP, Clerk authentication
- **Backend**: Express, MongoDB/Mongoose, Clerk SDK (token verification), Cloudinary (image uploads)
- **Auth Pattern**: Clerk handles OAuth on frontend; backend verifies Clerk session tokens and enforces single admin email via `ADMIN_EMAIL` env var

## Critical Patterns

### Authentication Flow
1. Frontend wrapped in `<ClerkProvider>` ([main.tsx](frontend/src/main.tsx))
2. Protected routes use `<ProtectedRoute>` ([ProtectedRoute.tsx](frontend/src/components/ProtectedRoute.tsx)) which wraps `SignedIn/SignedOut` components
3. API requests automatically attach Clerk session token via axios interceptor ([api.ts](frontend/src/services/api.ts#L8-L24))
4. Backend validates token with Clerk SDK and checks email matches `ADMIN_EMAIL` ([auth.middleware.ts](backend/src/middleware/auth.middleware.ts))
5. **Legacy code exists**: [auth.controller.ts](backend/src/controllers/auth.controller.ts) has unused bcrypt/JWT login (use Clerk instead)

### Image Upload Workflow
- Uses **in-memory multer** (no disk writes) → streams to Cloudinary via `streamifier` library
- Route protected with `authMiddleware` → `upload.single("file")` → `uploadToCloudinary` controller
- See [upload.controller.ts](backend/src/controllers/upload.controller.ts) and [upload.routes.ts](backend/src/routes/upload.routes.ts)
- Type-safe pattern: Extend `Request` as `MulterRequest` with optional `file` property

### Project Model Evolution
- [project.model.ts](backend/src/models/project.model.ts) has both `imageUrl` (legacy single image) and `images[]` (new gallery array)
- Always populate both fields for backward compatibility

### Admin Route Configuration
- Admin base path configurable via `VITE_ADMIN_BASE` env var (defaults to `/admin`)
- Centralized in [adminRoutes.ts](frontend/src/config/adminRoutes.ts) - use this config everywhere
- Navbar hidden on admin routes and project detail pages ([MainLayout.tsx](frontend/src/layouts/MainLayout.tsx#L18-L22))

### Locomotive Scroll Integration
- Initialized once in [MainLayout.tsx](frontend/src/layouts/MainLayout.tsx), destroys on unmount
- Sets `overflow: hidden` on `<html>` and `<body>` to hijack native scrolling
- Cleanup function removes injected classes (`has-scroll-smooth`, etc.) and DOM nodes (`.c-scrollbar`)
- Disable on mobile/tablet (`smartphone: { smooth: false }`)
- Context provided via `ScrollProvider` for programmatic scroll control

## Development Workflows

### Running the Stack
```powershell
# Backend (port 5000)
cd backend; npm run dev  # ts-node-dev with auto-restart

# Frontend (port 5173)
cd frontend; npm run dev  # Vite dev server with HMR
```

### Environment Variables Required
**Backend** (`.env` in `backend/`):
- `CLERK_SECRET_KEY` - Clerk backend secret
- `ADMIN_EMAIL` - Single authorized admin email
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - (legacy, not actively used with Clerk)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Frontend** (`.env` in `frontend/`):
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk frontend key
- `VITE_API_URL` - Backend API base (defaults to `http://localhost:5000/api`)
- `VITE_ADMIN_BASE` - Admin route prefix (defaults to `/admin`)

### TypeScript Specifics
- **Backend**: CommonJS (`"type": "commonjs"` in package.json), compiles to `dist/`
- **Frontend**: ES modules (`"type": "module"`), uses Vite's native ESM
- Custom type definitions in `backend/src/types/streamifier.d.ts` and `frontend/src/types/`
- Backend uses `require()` for untyped libs like `streamifier` to avoid TS errors

## Common Tasks

### Adding a New Protected Route (Frontend)
1. Import `ProtectedRoute` wrapper
2. Wrap route element: `<Route path="..." element={<ProtectedRoute><YourComponent /></ProtectedRoute>} />`
3. If custom admin path, use `ADMIN_ROUTES` config from [adminRoutes.ts](frontend/src/config/adminRoutes.ts)

### Adding a New Backend Endpoint
1. Create controller in `backend/src/controllers/`
2. Create route in `backend/src/routes/`, apply `authMiddleware` if admin-only
3. Register route in [server.ts](backend/src/server.ts) with `app.use("/api/...", route)`
4. Remember: All admin routes must use `authMiddleware` to enforce email check

### Debugging Clerk Auth Issues
- Check browser console for "✅ Added Clerk token to request" log ([api.ts](frontend/src/services/api.ts#L16))
- Backend logs show "🔐 Auth header received" → "✅ Token verified" → email comparison ([auth.middleware.ts](backend/src/middleware/auth.middleware.ts#L12-L47))
- Common issue: `ADMIN_EMAIL` mismatch returns 403 Forbidden

### Working with Locomotive Scroll
- Access scroll instance via `useContext(ScrollContext)` (not exported directly from MainLayout)
- Call `scrollInstance?.scrollTo(target)` for programmatic scrolling
- Use `data-scroll` attributes on elements for parallax/reveal effects (Locomotive convention)
