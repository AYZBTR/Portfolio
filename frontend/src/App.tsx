import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./pages/ProjectDetail";
import MainLayoutContent from "./layouts/MainLayout";
import Home from "./pages/Home";

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

          {/* 🔐 ADMIN AUTH ROUTE */}
          <Route path="/admin/login" element={<Login />} />

          {/* 🔒 PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <SiteSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}