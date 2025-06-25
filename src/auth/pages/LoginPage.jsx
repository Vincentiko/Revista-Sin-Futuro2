import { useEffect, useState } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';
import { FaInstagram } from 'react-icons/fa';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const {startLogin, errorMessage, status, user, startLogout} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email: loginEmail, contraseña: loginPassword});    
    }
    useEffect(() => {
        if(status === 'authenticated'){
            Swal.fire({
                title: "Bienvenido, preparate para descubrir un mundo de arte.",
                icon: "success",
                confirmButtonText: "Haz click aquí"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/"; 
            }
        });
        }
    })

    useEffect(() => {
        if(errorMessage !== undefined){
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
        }

    }, [errorMessage])

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
                    Iniciar sesión
                    </a>
                )}
                </div>
                {/*Publicaciones */}
                </div>
            </nav>
            <div className="container login-container">
                <div className="login-form-card">
                    <h3>Iniciar sesión</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Iniciar sesión" 
                            />
                        </div>
                        <div>
                            <a href="/cambioContra">¿Olvidaste tu contraseña?</a><br />
                            <a href="/create">¿No tienes cuenta? Has click aquí</a>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <div className="mb-2">
                    <a href="https://www.instagram.com/revistasinfuturo/?hl=es" className="text-white" aria-label="Instagram">
                    <FaInstagram size={24} />
                    </a>
                </div>
                <p className="mb-0">RevistaSinFuturo@Derechos reservados</p>
            </footer>
    </div>
    )
}