import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import FarmManagement from "./pages/FarmManagement";
import CropMonitoring from "./pages/CropMonitoring";
import DiseaseDetection from "./pages/DiseaseDetection";
import WaterStress from "./pages/WaterStress";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import Reports from "./pages/Reports";

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="page-content">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/farms"
              element={<FarmManagement />}
            />

            <Route
              path="/monitoring"
              element={<CropMonitoring />}
            />

            <Route
              path="/disease"
              element={<DiseaseDetection />}
            />

            <Route
              path="/water-stress"
              element={<WaterStress />}
            />

            <Route
              path="/weather"
              element={<Weather />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/recommendations"
              element={<Recommendations />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}