import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRevistaStore } from '../../hooks';
import Swal from 'sweetalert2';

export const EditarPublicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, startSavingEvent, startLoadingEvents, isLoadingEvents } = useRevistaStore();

  const [formValues, setFormValues] = useState(null);

  // Cargar eventos al montar
  useEffect(() => {
    startLoadingEvents();
  }, []);

  // Buscar publicación por ID cuando los eventos estén disponibles
  useEffect(() => {
    if (!isLoadingEvents && events.length > 0) {
      const post = events.find(e => String(e._id || e.id) === String(id));

      if (post) {
        setFormValues({
          titulo: post.titulo,
          descripcion: post.descripcion,
          tag: post.tag,
          imagen: null,
          imagenUrl: post.imagenUrl || '',
        });
      } else {
        Swal.fire('Error', 'No se encontró la publicación que intentas editar', 'error');
        navigate('/perfil');
      }
    }
  }, [events, id, isLoadingEvents, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, imagen: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      _id: id,
      titulo: formValues.titulo,
      descripcion: formValues.descripcion,
      tag: formValues.tag,
      imagen: formValues.imagen || null,
      imagenUrl: formValues.imagenUrl || '',
    };

    try {
        await startSavingEvent(updatedEvent);

        Swal.fire('Actualizado', 'Tu publicación fue editada correctamente', 'success')
            .then(() => {
                window.location.href = '/perfil';  // redirige
            });

        } catch (error) {
        console.error("❌ Error al guardar:", error);
        Swal.fire('Error', 'No se pudo actualizar la publicación', 'error');
        }
  };

  if (isLoadingEvents || !formValues) {
    return <p className="text-center mt-5">Cargando publicación...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Editar Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="form-control"
            value={formValues.titulo}
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
            value={formValues.tag}
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
            rows="4"
            value={formValues.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>

        {formValues.imagenUrl && (
          <div className="mb-3">
            <label>Imagen actual:</label>
            <img
              src={formValues.imagenUrl}
              alt="Actual"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Reemplazar Imagen (opcional)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/perfil')}>Cancelar</button>
      </form>
    </div>
  );
};
