import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
//import Cadastro from "./pages/Cadastro";
// import ProtectedRoute from "./components/ProtectedRoute";
//import Home from "./pages/Home";
//import Sala from "./pages/Sala"
import DefaultLayout from "./components/DefaultLayout";
//import MinhasReservas from "./pages/ShowReservas"
//import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout headerRender={1}><Login/></DefaultLayout>}/>
      </Routes>
    </Router>
  );
}

export default App;

