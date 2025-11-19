import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./Pages/routes/PrivateRoutes";
import { useState } from 'react'
import  Home  from './Pages/Home/Home'
import  Login  from './Pages/Login/Login'
import  Kanban  from './Pages/Kanban/Kanban'
import  User from './Pages/Admin/Usuario/Usuario'
import  Setor  from './Pages/Admin/Setor/Setor'
import  Categoria  from './Pages/Admin/Categoria/Categoria'
import  Item  from './Pages/Admin/Item/ITem'
import  Dashboard  from './Pages/Admin/Dashboard/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 🔓 público */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* 🔒 protegido */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/kanban"
              element={
                <PrivateRoute>
                  <Kanban />
                </PrivateRoute>
              }
            />

            {/* Rotas de administração*/}
            <Route
              path="/admin/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/categorias"
              element={
                <PrivateRoute>
                  <Categoria />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/setor"
              element={
                <PrivateRoute>
                  <Setor />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
