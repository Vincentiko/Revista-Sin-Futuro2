import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth";
import { CrearPublicacion, EventosPage, NoticiasPage, PoemasPage, RevistaPage, Perfil } from "../revista";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {

  const {status, checkAuthToken} = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  },[])

  if(status === 'checking') {
    return (
      <h3></h3>
    )
  }

  // const authStatus = 'authenticated';

  return (
    <Routes>
      {/* Rutas de la revista */}
        <Route path="/*" element={<RevistaPage/>}/>
        <Route path="/noticias/*" element={<NoticiasPage/>}/>
        <Route path="/poemas/*" element={<PoemasPage/>}/>
        <Route path="/eventos/*" element={<EventosPage/>}/>
        <Route path="/perfil/*" element={<Perfil/>}/>
      {/* Rutas de la creacion de publicaciones */}
        <Route path="/crearPublicacion/*" element={<CrearPublicacion/>}/>
      {/* Rutas de ingreso/crear cuenta */}
        <Route path="/auth/*" element={<LoginPage/>}/>
        <Route path="/create/*" element={<RegisterPage/>}/>

        

    </Routes>
  )
}
