import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlanning, updatePlanning, fetchCategories } from '@/redux/plannings/planningsSlice';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/form/Input';
import { Textarea } from '@/components/form/Textarea';

export const EditPlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { planningDetail, categories, loading, error } = useSelector((state) => state.plannings);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchPlanning(id));
    dispatch(fetchCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (planningDetail) {
      setValue('title', planningDetail.title);
      setValue('description', planningDetail.description);
      setValue('synopsis', planningDetail.synopsis);
      setValue('price', planningDetail.price);
      setValue('category_id', planningDetail.category_id);
    }
  }, [planningDetail, setValue]);

  const onSubmit = (data) => {
    dispatch(updatePlanning({ id, planningData: data }))
      .unwrap()
      .then(() => {
        navigate('/professional');
      })
      .catch((error) => {
        console.error("Failed to update planning:", error);
      });
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-[#da1641] to-[#ff6b6b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/professional')}
            className="flex items-center text-white mb-4 hover:underline"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Panel
          </button>
          <h3 className="text-h3 font-title font-bold">Editar Planificación</h3>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
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
          </div>
        </motion.div>
      </main>
    </div>
  );
};