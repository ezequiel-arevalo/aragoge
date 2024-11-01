import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePlanning } from '@/redux/plannings/planningsSlice';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useToast } from "@chakra-ui/react"; // Importa useToast

export const DeletePlanningPage = ({ planning, onClose, onDeleteSuccess }) => {
  const dispatch = useDispatch();
  const toast = useToast(); // Inicializa el toast
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deletePlanning(planning.id)).unwrap();
      onDeleteSuccess(planning.id);
    } catch (err) {
      setIsDeleting(false);
      toast({
        title: "Error al eliminar",
        description: "No se puede eliminar una planificación que posee suscripciones.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
            <h2 className="text-h2 font-title font-bold text-gray-900">Eliminar Planificación</h2>
          </div>
          <div className="mb-6">
            <h3 className="text-h3 font-title font-semibold text-gray-800 mb-2">{planning.title}</h3>
          </div>
          <p className="text-red-600 mb-6 text-center">
            ¿Estás seguro de que quieres eliminar esta planificación? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};