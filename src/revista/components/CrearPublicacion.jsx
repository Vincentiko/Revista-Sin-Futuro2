import { FaInstagram } from 'react-icons/fa';

import { useState } from 'react';
import './components.css'
import { useAuthStore, useRevistaStore } from '../../hooks';

export const CrearPublicacion = () => {
    const {status, user, startLogout} =useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
    const { startSavingEvent} = useRevistaStore(); // 🔹 Importamos la función de Redux
    const [newPost, setNewPost] = useState({
    titulo: "",
    tag: "",
    descripcion: "",
    start: new Date(), // Fecha de la publicación
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
        await startSavingEvent(newPost);
        setNewPost({ titulo: "", tag: "", descripcion: "", start: new Date(), imagen: null });
    } catch (error) {
        console.error("Error al guardar publicación:", error);
    }
};
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        setNewPost((prevPost) => ({
            ...prevPost,
            imagen: file, // Guarda la imagen en el estado
        }));
    }
  };

  return (
    <div>
      {/* Imagen de la empresa */}
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
          {/* Botón hamburguesa y logo */}
          <div className="d-flex align-items-center">
            {/* Botón hamburguesa */}
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

            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img
                src="/public/rev.png"
                alt="Logo Empresa"
                style={{ marginRight: '10px', maxHeight: '30px' }}
              />
              Revista Sin Futuro
            </a>
          </div>

          {/* Contenido colapsable */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/noticias">Noticias</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/poemas">Poemas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/eventos">Eventos</a>
              </li>
            </ul>
          </div>

          <div className="d-flex flex-column">
          {/* Botón dinámico */}
          {status === "authenticated" ? (
            // Menú desplegable para usuarios autenticados
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
                  <a className="dropdown-item" href="/profile">
                    Perfil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/private-session">
                    Configuraciones
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a 
                    className="dropdown-item text-danger"
                    onClick={startLogout}
                    href='/'
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            // Botón normal para usuarios no autenticados
            <a className="btn btn-outline-light mb-2" href="/auth">
              Ingreso
            </a>
          )}
        </div>
        {/*Publicaciones */}
        </div>
      </nav>
      
      {/* Formulario para crear posts */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Crea tu Post</h2>
        <form onSubmit={handlePostSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="form-control"
              value={newPost.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Categoría</label>
            <select
              className="form-select"
              id="tag"
              name="tag"
              value={newPost.tag}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Noticias">Noticias</option>
              <option value="Poemas">Poemas</option>
              <option value="Eventos">Eventos</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="3"
              value={newPost.descripcion}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Nuevo campo para subir imágenes */}
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Subir Imagen</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange} // Nueva función para manejar imágenes
            />
          </div>

          <button type="submit" className="btn btn-primary">Publicar</button>
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
