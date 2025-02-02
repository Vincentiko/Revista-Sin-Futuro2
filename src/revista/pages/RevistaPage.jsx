import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './RevistaPage.css';
import { useAuthStore } from '../../hooks';
import { useState } from 'react';

export const RevistaPage = () => {
  const {status, user, startLogout} =useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
 
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
                  <a className="dropdown-item" href="/preferences">
                    Modo Dark
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
      {/* Contenido principal */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Bienvenidos a Revista Sin Futuro</h1>
        <p className="text-center">
          Explora sobre noticias, poemas, eventos y más sobre el mundo del arte.
        </p>
        <hr />
        {/* Aquí puedes agregar más contenido dinámico */}
      </div>
      {/* Tarjetas animadas */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Explora el Blog</h1>
        <div className="row g-4">
          {/* Tarjeta de Noticias */}
          <div className="col-md-4">
            <div className="card custom-card animate__animated animate__bounceIn">
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img
                  src="/noticias.jpg" 
                  alt="Logo Empresa"
                  style={{ marginTop: '10px' ,maxWidth: '500px', maxHeight: '200px', width: 'auto', height: 'auto' }}
                />
              </div>
              <div className="card-body text-center">
                <a className="card-title" src="/public/noticias.jpg">
                  Noticias
                </a>
                  <p className="card-text">Mantente al día con las últimas novedades en Chile.</p>
              </div>
            </div>
          </div>
          {/* Tarjeta de Poemas */}
          <div className="col-md-4">
            <div className="card custom-card animate__animated animate__bounceIn">
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img
                  src="/poesia.jpg" 
                  alt="Logo Empresa"
                  style={{ marginTop: '10px' ,maxWidth: '500px', maxHeight: '200px', width: 'auto', height: 'auto' }}
                />
              </div>
              <div className="card-body text-center">
                <a className="card-title" href="/poesia.jpg">
                  Poemas
                </a>
                <p className="card-text">Explora la belleza de las palabras.</p>
              </div>
            </div>
          </div>
          {/* Tarjeta de Eventos */}
          <div className="col-md-4">
            <div className="card custom-card animate__animated animate__bounceIn">
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img
                  src="/eventos.png" // Cambia esta URL por la imagen de tu empresa
                  alt="Logo Empresa"
                  style={{ marginTop: '10px' ,maxWidth: '500px', maxHeight: '200px', width: 'auto', height: 'auto' }}
                />
              </div>
              <div className="card-body text-center">
                <a className="card-title" href="/eventos">
                  Eventos
                </a>
                <p className="card-text">Descubre eventos y actividades culturales.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="d-flex flex-column min-vh-100" style={{marginTop: '100px'}}>
      {/* Quienes Somos Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">¿Quiénes Somos?</h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/que linda que estas.jpg" className="d-block w-100" alt="Primera imagen" />
                </div>
                <div className="carousel-item">
                  <img src="/que linda que estas.jpg" className="d-block w-100" alt="Segunda imagen" />
                </div>
                <div className="carousel-item">
                  <img src="/que linda que estas.jpg" className="d-block w-100" alt="Tercera imagen" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <p style={{
              fontFamily: "'Merriweather', serif",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#333",
              fontWeight: "400",
              textAlign: "justify"
            }}>
              Somos una revista dedicada a explorar el arte y la cultura en todas sus formas.  
              Nuestro objetivo es compartir <strong>noticias, poemas, eventos y mucho más</strong>,  
              conectando a las personas con el mundo artístico y cultural.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="mb-2">
          <a href="https://facebook.com" className="text-white me-3" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/revistasinfuturo/?hl=es" className="text-white" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="mb-0">RevistaSinFuturo@Derechos reservados</p>
      </footer>
    </div>

    
    </div>
  );
};
