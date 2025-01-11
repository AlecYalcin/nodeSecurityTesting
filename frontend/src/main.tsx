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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Business Routes */}
        <Route path="/" element={<App />} /> {/* FEITO */}
        <Route path="/payment/transfer" element={<h1>Transferência</h1>} />
        <Route path="/payment/:id" element={<h1>Pagamentos X</h1>} />
        <Route path="/payment/search" element={<h1>Pesquisar Pagamento</h1>} />
        {/* Library Routes */}
        <Route path="/book/:id" element={<PageBookShow />} />
        <Route path="/book/:id/edit" element={<h1>Editar Livro X</h1>} />
        <Route path="/book/create" element={<h1>Criar um Livro</h1>} />
        {/* Profile Routes */}
        <Route path="/profile/:id" element={<h1>Perfil do Usuário X</h1>} />
        <Route path="/profile/:id/edit" element={<h1>Editar Perfil X</h1>} />
        <Route path="/profile/:id/history" element={<h1>Pagamentos</h1>} />
        <Route path="/profile/search" element={<h1>Procurar</h1>} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} /> {/* FEITO */}
        <Route path="/register" element={<Register />} /> {/* FEITO */}
      </Routes>
    </Router>
  </StrictMode>
);
