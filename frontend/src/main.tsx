// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// React Packages
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pages
import App from "./pages/business/app";
import PageLogin from "./pages/auth/login";
import Register from "./pages/auth/register";
import Payment from "./pages/business/payment";
import PageBookShow from "./pages/library/show";
import PageBookEdit from "./pages/library/edit";
import PageBookCreate from "./pages/library/create";
import PageProfileShow from "./pages/profile/show";
import PageProfileEdit from "./pages/profile/edit";
import PageProfileSearch from "./pages/profile/search";
import PageProfileHistory from "./pages/profile/history";
import PagePaymentSearch from "./pages/business/search";
import PagePaymentTransfer from "./pages/business/transfer";
import MainLayout from "./pages/main-layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Business Routes */}

        <Route
          path="/"
          element={
            <MainLayout>
              <App />
            </MainLayout>
          }
        />
        <Route
          path="/payment/transfer"
          element={
            <MainLayout>
              <PagePaymentTransfer />
            </MainLayout>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <MainLayout>
              <Payment />
            </MainLayout>
          }
        />
        <Route
          path="/payment/search"
          element={
            <MainLayout>
              <PagePaymentSearch />
            </MainLayout>
          }
        />

        {/* Library Routes */}

        <Route
          path="/book/:id"
          element={
            <MainLayout>
              <PageBookShow />
            </MainLayout>
          }
        />
        <Route
          path="/book/:id/edit"
          element={
            <MainLayout>
              <PageBookEdit />
            </MainLayout>
          }
        />
        <Route
          path="/book/create"
          element={
            <MainLayout>
              <PageBookCreate />
            </MainLayout>
          }
        />
        <Route
          path="/book/search"
          element={
            <MainLayout>
              <h1>Página de Busca</h1>
            </MainLayout>
          }
        />

        {/* Profile Routes */}

        <Route
          path="/profile/:id"
          element={
            <MainLayout>
              <PageProfileShow />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <MainLayout>
              <PageProfileEdit />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:id/history"
          element={
            <MainLayout>
              <PageProfileHistory />
            </MainLayout>
          }
        />
        <Route
          path="/profile/search"
          element={
            <MainLayout>
              <PageProfileSearch />
            </MainLayout>
          }
        />

        {/* Auth Routes */}

        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>
);
