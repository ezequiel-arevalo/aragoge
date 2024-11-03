import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPlanning, deletePlanning } from '@/redux/plannings/planningsSlice';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@chakra-ui/react';
import Loader from '@/components/Loader';

export const DeletePlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planningDetail, loading, error } = useSelector((state) => state.plannings);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchPlanning(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePlanning(id)).unwrap();
      toast({
        title: "Planificación eliminada",
        description: "La planificación se eliminó correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      navigate('/professional');
    } catch (err) {
      toast({
        title: "Error al eliminar",
        description: err || "No se pudo eliminar la planificación.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  if (loading) {
    return <Loader />;
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
          <h3 className="text-h3 font-title font-bold">Eliminar Planificación</h3>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8 text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro que deseas eliminar esta planificación?</h4>
            <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/professional')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#da1641] text-white px-6 py-2 rounded-full hover:bg-[#c30d35] transition duration-300"
              >
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DeletePlanningPage;