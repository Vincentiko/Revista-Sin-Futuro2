import { FaInstagram } from 'react-icons/fa';
import './components.css';
import { useAuthStore, useRevistaStore } from '../../hooks';
import {   useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


export const PoemasPage = () => {
  const {events, isLoadingEvents, startLoadingEvents} = useRevistaStore();
  const {status, user, startLogout} =useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };


  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
    
      const handleCrearPublicacion = () => {
        if (status !== "authenticated") {
          // Si no está logueado, mostrar alerta
          Swal.fire({
            icon: "warning",
            title: "Acceso restringido",
            text: "Debes iniciar sesión para crear una publicación.",
            confirmButtonText: "Ok",
          });
        } else {
          // Si está logueado, redirigir a la página de creación
          navigate("/crearPublicacion");
        }
      };
  
  useEffect(() => {
    startLoadingEvents();
  })



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
                src="/rev.png"
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
                  <a className="dropdown-item" href="/perfil">
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
      <div className="crear-publicacion-container">
        <div className="crear-publicacion-card">
          <h2 className="crear-publicacion-title">
            ¿Te gustaría publicar una noticia, un poema o un evento?
            
          </h2>
          <p className="crear-publicacion-text">
            Comparte tu creatividad con el mundo. ¡Haz clic en el botón de abajo para
            comenzar a crear tu publicación!
          </p>
          <button className="crear-publicacion-btn" onClick={handleCrearPublicacion}>
            Crear publicación
          </button>
        </div>
      </div>
      {/* Mostrar publicaciones */}
      <div>
        <h2 className='ñau'>Poemas</h2>
        {isLoadingEvents ? (
          <p></p>
        ) : (
          <div className="posts">
            {events.filter(event => event.tag === "Poemas").length === 0 ? (
              <p>No hay eventos disponibles.</p>
            ) : (
              events
                .filter(event => event.tag === "Poemas")
                .map((event, index) => (
                  <div key={index} className="post-card">
                    {event.image && (
                      <div className="post-card-image">
                        <img src={event.image} alt="Post" />
                      </div>
                    )}
                    <div className="post-card-body">
                      <small>
                        {event.start
                          ? new Date(event.start).toLocaleDateString("es-CL")
                          : "Fecha no disponible"}
                      </small>
                      <h5 className="post-card-title">{event.titulo}</h5>
                      {event.imagenUrl && (
                        <div className="post-card-image">
                          <img src={event.imagenUrl} alt="Imagen del evento" />
                        </div>
                      )}
                      <div className={`post-card-tag tag-${event.tag?.toLowerCase()}`}>
                        {event.tag}
                      </div>
                      
                      <div className="button-container">
                        <button className="post-card-btn" onClick={() => openModal(event)}>
                          Leer más
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

        </div>

      {/* Modal */}
      {modalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.titulo}</h2>
             {/* ✅ Mostrar la imagen correctamente */}
              {selectedEvent.imagenUrl && (
                <img src={selectedEvent.imagenUrl} alt="Imagen del evento" />
              )}
            <p><strong></strong> {selectedEvent.descripcion}</p>
            <p><strong>Tag:</strong> {selectedEvent.tag}</p>
            <p><strong>Autor:</strong> {selectedEvent.user?.nombre || "Desconocido"}</p>
            <p><strong>Fecha:</strong> {new Date(selectedEvent.start).toLocaleString("es-CL")}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
      
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto" >
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

