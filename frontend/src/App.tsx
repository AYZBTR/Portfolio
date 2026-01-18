import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./pages/ProjectDetail";
import MainLayoutContent from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"; // ⭐ ADD THIS
import ADMIN_ROUTES from "./config/adminRoutes";

// Admin Pages
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import CreateProject from "./pages/Admin/CreateProject";
import EditProject from "./pages/Admin/EditProject";
import SiteSettingsPage from "./pages/Admin/SiteSettings";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayoutContent />}>
          {/* 🌍 PUBLIC WEBSITE */}
          <Route path="/" element={<Home />} />

          {/* 📁 PROJECT DETAIL PAGE */}
          <Route path="/projects/:id" element={<ProjectDetail />} />

          {/* 🔐 ADMIN AUTH ROUTE */}
          <Route path={ADMIN_ROUTES.LOGIN} element={<Login />} />

          {/* 🔒 PROTECTED ADMIN ROUTES */}
          <Route
            path={ADMIN_ROUTES.BASE}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={ADMIN_ROUTES.CREATE}
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          <Route
            path={`${ADMIN_ROUTES.BASE}/edit/:id`}
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path={ADMIN_ROUTES.SETTINGS}
            element={
              <ProtectedRoute>
                <SiteSettingsPage />
              </ProtectedRoute>
            }
          />

          {/* 404 - Page Not Found - MUST BE LAST!  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}