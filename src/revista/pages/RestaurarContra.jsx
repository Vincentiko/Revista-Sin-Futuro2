import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaInstagram } from 'react-icons/fa';
import { useAuthStore } from '../../hooks';
import './RevistaPage.css';

export const RestaurarContra = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const { status, user, startLogout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const adminUid = import.meta.env.VITE_ADMIN_UID;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaPassword.length < 6) {
      return Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
    }

    if (nuevaPassword !== confirmacion) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    try {
      const resp = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nuevaPassword }),
      });

      const body = await resp.json();

      if (body.ok) {
        Swal.fire("Éxito", body.msg, "success").then(() => {
          navigate("/auth");
        });
      } else {
        Swal.fire("Error", body.msg || "Hubo un problema", "error");
      }
    } catch (error) {
      console.error("❌ Error al enviar nueva contraseña:", error);
      Swal.fire("Error", "Hubo un problema al procesar tu solicitud", "error");
    }
  };

  return (
    <div>
      {/* Encabezado */}
      <h1 className="animate__animated animate__zoomInUp"
        style={{
          textAlign: "center",
          fontFamily: "'Dancing Script', cursive",
          fontSize: '2.5rem',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
        }}>
        Revista <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>Sin Futuro</span>:
        <span style={{ fontFamily: "'Playfair Display', serif" }}> Para el futuro de la poesía</span>
      </h1>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand d-flex align-items-center" href="/">
              <img
                src="/rev.png"
                alt="Logo Empresa"
                style={{ marginRight: '10px', maxHeight: '30px' }}
              />
              Revista Sin Futuro
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="/noticias">Noticias</a></li>
              <li className="nav-item"><a className="nav-link" href="/poemas">Poemas</a></li>
              <li className="nav-item"><a className="nav-link" href="/eventos">Eventos</a></li>
            </ul>
          </div>

          <div className="d-flex flex-column">
            {status === "authenticated" ? (
              <div className="dropdown">
                <button
                  onClick={toggleDropdown}
                  className="btn btn-dark dropdown-toggle d-flex align-items-center"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                >
                  <span>{user.nombre}</span>
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-dark dropdown-menu-end ${isOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href={user.uid === adminUid ? "/perAdmin" : "/perfil"}>
                      Perfil
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item text-danger" onClick={startLogout} href="/">
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a className="btn btn-outline-light mb-2" href="/auth">Ingreso</a>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container my-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Establecer nueva contraseña</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nuevaPassword" className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              id="nuevaPassword"
              placeholder="Nueva contraseña"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmacion" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmacion"
              placeholder="Confirmar contraseña"
              value={confirmacion}
              onChange={(e) => setConfirmacion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Restaurar contraseña</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="mb-2">
          <a href="https://www.instagram.com/revistasinfuturo/?hl=es" className="text-white" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="mb-0">RevistaSinFuturo@Derechos reservados</p>
      </footer>
    </div>
  );
};
