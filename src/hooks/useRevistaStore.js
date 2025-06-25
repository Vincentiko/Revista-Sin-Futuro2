import { revistaApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/revista/revistaSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




export const useRevistaStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent, isLoadingEvents } = useSelector((state) => state.calendar);
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();


  const setActiveEvent = (revistaEvent) => {
    dispatch(onSetActiveEvent(revistaEvent))
  }

  const startSavingEvent = async (revistaEvent) => {
    try {
        if (revistaEvent._id) {
          console.log("🛠 Editando evento:", revistaEvent);

          const dataToSend = {
            titulo: revistaEvent.titulo,
            descripcion: revistaEvent.descripcion,
            tag: revistaEvent.tag,
            imagenUrl: revistaEvent.imagenUrl,
          };

          const { data } = await revistaApi.put(`/events/${revistaEvent._id}`, dataToSend);

          dispatch(onUpdateEvent({ ...data.evento, user }));
          return;
        }

        let imagenUrl = "";

        // 🔹 Subir imagen a Cloudinary solo si se ha seleccionado una
        if (revistaEvent.imagen instanceof File) {
            try {
                const formData = new FormData();
                formData.append("file", revistaEvent.imagen);
                formData.append("upload_preset", "revista-sin-futuro"); 
                
                const res = await fetch("https://api.cloudinary.com/v1_1/dqsmeb8xb/image/upload", {
                    method: "POST",
                    body: formData
                });

                if (!res.ok) throw new Error("Error al subir imagen");

                const cloudinaryData = await res.json();
                imagenUrl = cloudinaryData.secure_url;

                Swal.fire({
                  title: "La publicación ha sido creada",
                  icon: "success",
                  draggable: true
                }).then(() => {
                  navigate("/");  // Reemplaza "/nueva-ruta" con la ruta a la que quieres ir
                });
                

            } catch (uploadError) {
                console.error("❌ Error al subir imagen:", uploadError);
            }
        }

        // 🔹 Verifica que `imagenUrl` se asigna correctamente antes de enviar la petición
        const dataToSend = { 
            ...revistaEvent, 
            imagenUrl 
        };
        console.log("📩 Datos que se enviarán al backend:", dataToSend); // 👀 Verifica si imagenUrl está vacío aquí

        // 🔹 Enviar la URL de la imagen junto con los otros datos
        const { data } = await revistaApi.post('/events', dataToSend);

        dispatch(onAddNewEvent({ ...revistaEvent, _id: data.evento.id, user, imagenUrl }));
    } catch (error) {
        console.error("Error al guardar evento:", error);
        Swal.fire('Error al guardar', error.response?.data?.msg || "Ocurrió un error", 'error');
    }
};



  const startDeletingEvent = async(event) => {
    //TODO: Llegar al Backend

    try {
        await revistaApi.delete((`/events/${event.id}`));
        dispatch(onDeleteEvent(event.id));
    } catch (error) {
        console.log(error)
        Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }

    dispatch(onDeleteEvent());
}

  const startLoadingEvents = async () => {
    try {
      const { data } = await revistaApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos", error);
    }
  };

  return {
    // Propiedades
    events,
    isLoadingEvents,

    // Métodos
    startDeletingEvent,
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent
  };
};
