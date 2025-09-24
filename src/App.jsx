import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeAdm from "./pages/HomeAdm";
import DefaultLayout from "./components/DefaultLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Cadastro from "./pages/Cadastro";
import ListarUsuario from "./pages/ListarUsuarios";
import Perfil from "./pages/Perfil";
import SalasPage from "./pages/Salas";
import ReservaPage from "./pages/Reserva";
import CriarSala from "./pages/CriarSala";
import ListarSalas from "./pages/ListarSalas";
import Reservas from "./pages/ReservasAdmin";
// import MinhasReservas from "./pages/MinhasReservas";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout headerRender={1}>
              <Login />
            </DefaultLayout>
          }
        />
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
            <ProtectedRoute tipo="Admin" >
              <Cadastro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salas"
          element={
            <ProtectedRoute>
              <SalasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserva"
          element={
            <ProtectedRoute>
              <ReservaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute tipo="Admin">
              <ListarUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criarSala"
          element={
            <ProtectedRoute tipo="Admin" >
              <CriarSala />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listarSalas"
          element={
            <ProtectedRoute tipo="Admin">
              <ListarSalas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <ProtectedRoute tipo="Admin">
              <Reservas/>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <MinhasReservas />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
