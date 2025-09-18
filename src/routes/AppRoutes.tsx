import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UpdatePrestamoClient } from "../components/Prestamo/UpdatePrestamo";
import { RegisterClient } from "../components/Clients/RegisterClient";
import { DashboardSuperAdmin } from "../components/Admin2/DashBoardAdmin2";
import { DashboardAdmin } from "../components/Admin/DashBoard";
import { GestionPrestamo } from "../components/Admin2/Gestion";
import {  EstadoPrestamo } from "../components/Admin/EstadoPrestamo";
import { PrestamosClient} from "../components/Clients/PrestamoCliente";
import { UpdateClient } from "../components/Clients/UpdateClient";
import { UpdateLibro } from "../components/Books/UpdateLibro";
import { TodosLibros } from "../components/Books/TodosLibros";
import { RegistroLibro } from "../components/Books/RegisterLibro";
import { RegisterPrestamos } from "../components/Prestamo/Register";
import { Prestamos } from "../pages/Prestamo";
import { Login } from "../pages/Login";
import { Libros } from "../pages/Libro";
import { Clientes } from "../pages/Cliente";
import { Home } from "../pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios/registrar" element={<RegisterClient />} />
      <Route path="/libros" element={<Libros />} />

      <Route
        path="/prestamos/editar/cliente/:id"
        element={
          <ProtectedRoute roles={[1]}>
            <UpdatePrestamoClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos/mis-prestamos"
        element={
          <ProtectedRoute roles={[1]}>
            <Prestamos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos/registrar/:id"
        element={
          <ProtectedRoute roles={[1]}>
            <RegisterPrestamos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videojuegos/registrar"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <RegistroLibro/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/videojuegos/admin"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <TodosLibros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videojuegos/editar/:id"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <UpdateLibro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute roles={[3]}>
            <Clientes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios/editar/:id"
        element={
          <ProtectedRoute roles={[3]}>
            <UpdateClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios/prestamos/:id"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <PrestamosClient/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/prestamos/admin"
        element={
          <ProtectedRoute roles={[2]}>
            <EstadoPrestamo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos/superadmin"
        element={
          <ProtectedRoute roles={[3]}>
            <GestionPrestamo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={[2]}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/superadmin"
        element={
          <ProtectedRoute roles={[3]}>
            <DashboardSuperAdmin/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
