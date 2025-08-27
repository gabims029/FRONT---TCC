import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeAdm from "./pages/HomeAdm";
//import Sala from "./pages/Sala"
import DefaultLayout from "./components/DefaultLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Cadastro from "./pages/Cadastro";
//import MinhasReservas from "./pages/ShowReservas"
import Perfil from "./pages/Perfil"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout headerRender={1}><Login/></DefaultLayout>}/>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeAdm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <ProtectedRoute>
              <Cadastro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Perfil/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
