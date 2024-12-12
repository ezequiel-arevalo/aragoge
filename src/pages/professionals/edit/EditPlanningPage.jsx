import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlanning, updatePlanning, fetchInitialData } from '@/redux/plannings/planningsThunks';
import {
  selectPlanningDetail,
  selectCategories,
  selectLoading,
  selectError
} from '@/redux/plannings/planningsSelectors';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/form/Input';
import { Textarea } from '@/components/form/Textarea';
import { useToast } from '@chakra-ui/react';

export const EditPlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const planningDetail = useSelector(selectPlanningDetail);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Cargar datos cuando se accede a la página
  useEffect(() => {
    dispatch(fetchPlanning(id));  // Obtener detalles de la planificación por ID
    dispatch(fetchInitialData());  // Obtener categorías
  }, [dispatch, id]);

  // Llenar el formulario con los detalles de la planificación
  useEffect(() => {
    if (planningDetail) {
      setValue('title', planningDetail.title);
      setValue('description', planningDetail.description);
      setValue('synopsis', planningDetail.synopsis);
      setValue('price', planningDetail.price);
      setValue('category_id', planningDetail.category_id);
      setValue('cover_alt', planningDetail.cover_alt);
    }
  }, [planningDetail, setValue]);

  // Enviar los datos del formulario para actualizar la planificación
  const onSubmit = async (data) => {
    const payload = new FormData();
    // Agregar los campos de texto
    Object.entries(data).forEach(([key, value]) => {
      payload.append(key, value);
    });

    // Si se ha seleccionado una nueva imagen, agregarla a FormData
    if (data.cover && data.cover[0]) {
      payload.append('cover', data.cover[0]);  // Asegurarse de que sea un archivo
    }

    try {
      await dispatch(updatePlanning({ id, planningData: payload })).unwrap();
      toast({
        title: 'Planificación actualizada',
        description: 'La planificación se actualizó correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      navigate('/professional');  // Redirigir después de la actualización
    } catch (error) {
      console.error('Error al actualizar la planificación:', error);
      toast({
        title: 'Error al actualizar la planificación',
        description: error.message || 'No se pudo actualizar la planificación.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/professional')}
            className="flex items-center text-white mb-4 hover:underline bg-transparent hover:bg-transparent"
            aria-label="Volver al Panel de Profesional"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Panel
          </button>
          <h1 className="text-h1 font-title font-bold">Editar Planificación</h1>
        </div>
      </div>

      {/* Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden p-8 max-w-3xl mx-auto mt-8"
      >
        <h2 className="text-h2 font-semibold text-gray-800 text-center mb-6">
          Actualiza los detalles de tu planificación
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            register={register}
            name="title"
            label="Título"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa el título de la planificación',
            }}
          />
          <Textarea
            register={register}
            name="description"
            label="Descripción"
            errors={errors}
            textareaProps={{
              placeholder: 'Ingresa la descripción de la planificación',
              rows: 4,
            }}
          />
          <Input
            register={register}
            name="synopsis"
            label="Sinopsis"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa la sinopsis',
            }}
          />
          <Input
            register={register}
            name="price"
            label="Precio"
            type="number"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa el precio',
            }}
          />
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="category_id"
              {...register('category_id', { required: 'La categoría es obligatoria' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
          </div>

          {/* Portada */}
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
              Portada
            </label>
            <input
              id="cover"
              type="file"
              name="cover"
              {...register('cover')}  // Registrar el campo de portada
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
              accept="image/*"
            />
          </div>

          {/* Texto alternativo de la portada */}
          <Input
            register={register}
            id="cover_alt"
            name="cover_alt"
            label="Alt de imagen"
            errors={errors}
            value={planningDetail?.cover_alt || ""}
            inputProps={{
              placeholder: 'Texto Alternativo de la Portada'
            }}
          />

          {/* Botón de envío */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#da1641] text-white px-6 py-2 rounded-full hover:bg-[#c30d35] transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Actualizando...' : 'Actualizar Planificación'}
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};