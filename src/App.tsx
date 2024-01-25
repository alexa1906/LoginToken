import React from "react";
import LogInForm from "./pages/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const client = new QueryClient();

const ProtectedRoute = ({ redirectPath = "/" }) => {

  if (!localStorage.getItem("jwtAccessToken")) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogInForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
