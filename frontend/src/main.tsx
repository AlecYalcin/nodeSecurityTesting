// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// React Packages
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pages
import PageLibrarySearch from "./pages/library/search";
import PageLogin from "./pages/auth/login";
import Register from "./pages/auth/register";
import PageBookShow from "./pages/library/show";
import PageBookEdit from "./pages/library/edit";
import PageBookCreate from "./pages/library/create";
import PageProfileShow from "./pages/profile/show";
import PageProfileEdit from "./pages/profile/edit";
import PageProfileSearch from "./pages/profile/search";
import PageProfileHistory from "./pages/profile/history";
import PagePaymentSearch from "./pages/business/search";
import PagePaymentTransfer from "./pages/business/transfer";
import Layout from "./pages/main-layout";
import AppWithCache from "./pages/business/app-cache";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      {/* Business Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <AppWithCache />
            </Layout>
          }
        />
        <Route
          path="/payment/transfer"
          element={
            <Layout>
              <PagePaymentTransfer />
            </Layout>
          }
        />
        <Route
          path="/payment/search"
          element={
            <Layout>
              <PagePaymentSearch />
            </Layout>
          }
        />
      </Routes>

      {/* Library Routes */}
      <Routes>
        <Route
          path="/book/:id"
          element={
            <Layout>
              <PageBookShow />
            </Layout>
          }
        />
        <Route
          path="/book/:id/edit"
          element={
            <Layout>
              <PageBookEdit />
            </Layout>
          }
        />
        <Route
          path="/book/create"
          element={
            <Layout>
              <PageBookCreate />
            </Layout>
          }
        />
        <Route
          path="/book/search"
          element={
            <Layout>
              <PageLibrarySearch />
            </Layout>
          }
        />
      </Routes>

      {/* Profile Routes */}
      <Routes>
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <PageProfileShow />
            </Layout>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <Layout>
              <PageProfileEdit />
            </Layout>
          }
        />
        <Route
          path="/profile/:id/history"
          element={
            <Layout>
              <PageProfileHistory />
            </Layout>
          }
        />
        <Route
          path="/profile/search"
          element={
            <Layout>
              <PageProfileSearch />
            </Layout>
          }
        />
      </Routes>

      {/* Auth Routes */}
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>
);
