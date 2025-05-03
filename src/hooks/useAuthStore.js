import { useDispatch, useSelector } from "react-redux"
import { revistaApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, contraseña}) => {
        dispatch(onChecking());

        try {
            const {data} = await revistaApi.post('/auth', {email, contraseña})
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ uid: data.uid, nombre: data.nombre}))
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({email, contraseña, nombre}) => {
        dispatch(onChecking());

        try {
            const {data} = await revistaApi.post('/auth/new', {email, contraseña, nombre})
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}))
            localStorage.clear(); // Borra todo el localStorage 
            Swal.fire({
                title: "Registro completado. Ahora inicia sesión",
                icon: "success",
                draggable: true
            }).then(() => {
                window.location.href = "/auth";  // ✅ Redirige correctamente sin usar `useNavigate`
            });          
             
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const {data} = await revistaApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }
    const startGoogleLogin = async (googleUser) => {
        dispatch(onChecking());
    
        try {
            const { data } = await revistaApi.post('/auth/google', {
                email: googleUser.email,
                name: googleUser.name,
                sub: googleUser.sub
            });
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
    
            dispatch(onLogin({ uid: data.uid, nombre: data.nombre }));
    
        } catch (error) {
            dispatch(onLogout('No se pudo iniciar sesión con Google'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };    
    



    return {
        //propiedades
        status,
        errorMessage,
        user,
        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        startGoogleLogin
    }
}