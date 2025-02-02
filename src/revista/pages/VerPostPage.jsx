
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export const VerPostPage = () => {



  return (
    <div>
      {/* Imagen de la empresa */}
      <div className="text-center py-3" style={{ backgroundColor: '#f8f9fa' }}>
        <img
          src="/assets/logo-revista.png"
          alt="Logo Empresa"
          style={{ maxHeight: '50px' }}
        />
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="/assets/rev.png"
              alt="Logo Empresa"
              style={{ marginRight: '20px', maxHeight: '30px' }}
            />
            Revista Sin Futuro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/auth/*">Ingreso</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create">Crear Cuenta</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      
      {/* Footer */}
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
  );
};

