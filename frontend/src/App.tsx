import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./pages/ProjectDetail";
import MainLayoutContent from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ADMIN_ROUTES from "./config/adminRoutes";

// Admin Pages
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import CreateProject from "./pages/Admin/CreateProject";
import EditProject from "./pages/Admin/EditProject";
import SiteSettingsPage from "./pages/Admin/SiteSettings";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

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
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path={ADMIN_ROUTES.CREATE}
            element={
              <AdminRoute>
                <CreateProject />
              </AdminRoute>
            }
          />

          <Route
            path={`${ADMIN_ROUTES.BASE}/edit/:id`}
            element={
              <AdminRoute>
                <EditProject />
              </AdminRoute>
            }
          />

          <Route
            path={ADMIN_ROUTES.SETTINGS}
            element={
              <AdminRoute>
                <SiteSettingsPage />
              </AdminRoute>
            }
          />

          {/* 404 - Page Not Found - MUST BE LAST!  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}