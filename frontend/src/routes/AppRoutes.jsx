import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import Requests from "../pages/Requests";
import Tracking from "../pages/Tracking";
import RequestDetails from "../pages/RequestDetails";

import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";
import AdminMechanics from "../pages/AdminMechanics";
import AdminRequests from "../pages/AdminRequests";

import MechanicDashboard from "../pages/MechanicDashboard";
import MechanicJobs from "../pages/MechanicJobs";
import MechanicActiveJobs from "../pages/MechanicActiveJobs";
import MechanicTracking from "../pages/MechanicTracking";
import MechanicProfile from "../pages/MechanicProfile";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/vehicles"
        element={<Vehicles />}
      />

      <Route
        path="/requests"
        element={<Requests />}
      />

      <Route
        path="/requests/:id"
        element={<RequestDetails />}
      />

      <Route
        path="/tracking"
        element={<Tracking />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/notifications"
        element={<Notifications />}
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/users"
        element={<AdminUsers />}
      />

      <Route
        path="/admin/mechanics"
        element={<AdminMechanics />}
      />

      <Route
        path="/admin/requests"
        element={<AdminRequests />}
      />

      {/* Mechanic Routes */}
      <Route
        path="/mechanic/dashboard"
        element={<MechanicDashboard />}
      />

      <Route
        path="/mechanic/jobs"
        element={<MechanicJobs />}
      />

      <Route
        path="/mechanic/active-jobs"
        element={<MechanicActiveJobs />}
      />

      <Route
        path="/mechanic/tracking"
        element={<MechanicTracking />}
      />

      <Route
        path="/mechanic/profile"
        element={<MechanicProfile />}
      />

    </Routes>
  );
}

export default AppRoutes;