import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
/import ProtectedRoute from "./components/ProtectedRoute";
import HomeAdm from "./pages/HomeAdm";
//import Sala from "./pages/Sala"
import DefaultLayout from "./components/DefaultLayout";
import Cadastro from "./pages/Cadastro";
//import MinhasReservas from "./pages/ShowReservas"
//import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout headerRender={1}><Login/></DefaultLayout>}/>
        <Route
          path="/home"
          element={
            <DefaultLayout headerRender={2}>
              <HomeAdm />
            </DefaultLayout>
          }
        />
        <Route
          path="/cadastro"
          element={
            <DefaultLayout>
              <Cadastro />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
