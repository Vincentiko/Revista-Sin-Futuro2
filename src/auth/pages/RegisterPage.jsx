import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";

const registerFormFields = {
  registerNombre: '',
  registerEmail: '',
  registerContraseña: '',
  registerContraseña2: '',

}

export const RegisterPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    
        const toggleDropdown = () => setIsOpen(!isOpen);

  const {startRegister, status, user, startLogout} = useAuthStore();

  const {registerEmail, registerNombre, registerContraseña, registerContraseña2, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    if(registerContraseña !== registerContraseña2){
        Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
        return;
    }
    startRegister({nombre: registerNombre, email: registerEmail, contraseña: registerContraseña})
  }


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
                            src="/assets/rev.png"
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
                        <a className="btn btn-outline-light mb-2" href="/auth/login">
                        Iniciar sesión
                        </a>
                    )}
                    </div>
                    {/*Publicaciones */}
                    </div>
                </nav>
                <div className="register-container">
                    <div className="register-card">
                        <h3 className="register-title">Registro</h3>
                        <form onSubmit={registerSubmit} className="register-form">
                        <div className="form-group mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="registerNombre"
                            value={registerNombre}
                            onChange={onRegisterInputChange}
                            required
                            />
                        </div>
                        
                        <div className="form-group mb-3">
                            <label className="form-label">Correo</label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="registerEmail"
                            value={registerEmail}
                            onChange={onRegisterInputChange}
                            required
                            />
                        </div>
                        
                        <div className="form-group mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="registerContraseña"
                            value={registerContraseña}
                            onChange={onRegisterInputChange}
                            required
                            />
                        </div>
                        
                        <div className="form-group mb-3">
                            <label className="form-label">Repita la contraseña</label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña"
                            name="registerContraseña2"
                            value={registerContraseña2}
                            onChange={onRegisterInputChange}
                            required
                            />
                        </div>
                        
                        <div className="d-grid">
                            <button type="submit" className="register-btn">
                            Crear cuenta
                            </button>
                        </div>
                        </form>
                    </div>
                </div>


                
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
  )
}

