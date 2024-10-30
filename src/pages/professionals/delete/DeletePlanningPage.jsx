import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlanning, deletePlanning } from '@/redux/plannings/planningsSlice';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const DeletePlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planningDetail, loading, error } = useSelector((state) => state.plannings);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchPlanning(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deletePlanning(id)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to delete the planning:', err);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="px-6 py-8">
          <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
            <h2 className="text-h2 font-title font-bold text-gray-900">Eliminar Planificación</h2>
          </div>
          {planningDetail && (
            <div className="mb-6">
              <h3 className="text-h3 font-title font-semibold text-gray-800 mb-2">{planningDetail.title}</h3>
              <p className="text-gray-600">{planningDetail.synopsis}</p>
            </div>
          )}
          <p className="text-red-600 mb-6">
            ¿Estás seguro de que quieres eliminar esta planificación? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => navigate('/')}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};