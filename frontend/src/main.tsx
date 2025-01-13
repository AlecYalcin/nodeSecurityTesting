// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pages
import App from "./pages/business/app";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import PageBookShow from "./pages/library/show";
import PageBookEdit from "./pages/library/edit";
import PageBookCreate from "./pages/library/create";
import PageProfileShow from "./pages/profile/show";
import PageProfileEdit from "./pages/profile/edit";
import PageProfileHistory from "./pages/profile/history";
import PageProfileSearch from "./pages/profile/search";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Business Routes */}

        {/* FEITO */}
        <Route path="/" element={<App />} />

        <Route path="/payment/transfer" element={<h1>Transferência</h1>} />
        <Route path="/payment/:id" element={<h1>Pagamentos X</h1>} />
        <Route path="/payment/search" element={<h1>Pesquisar Pagamento</h1>} />

        {/* Library Routes */}

        <Route path="/book/:id" element={<PageBookShow />} />
        <Route path="/book/:id/edit" element={<PageBookEdit />} />
        <Route path="/book/create" element={<PageBookCreate />} />

        {/* Profile Routes */}

        <Route path="/profile/:id" element={<PageProfileShow />} />
        <Route path="/profile/:id/edit" element={<PageProfileEdit />} />
        <Route path="/profile/:id/history" element={<PageProfileHistory />} />
        <Route path="/profile/search" element={<PageProfileSearch />} />

        {/* Auth Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </StrictMode>
);
