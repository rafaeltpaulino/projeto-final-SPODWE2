import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topo from "./components/Topo";
import Home from "./components/Home";
import Receitas from "./components/Receitas";
import Rodape from "./components/Rodape";
import Usuarios from "./components/Usuarios";
import Categorias from "./components/Categorias";

const App = () => {
  return (
    <Router>
      <Topo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
      <Rodape />
    </Router>
  );
};
export default App;