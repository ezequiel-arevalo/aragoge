import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';

export const PlanningCard = ({ planning, isProfessional, onDeleteClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Imagen con fallback */}
      <img
        src={planning.image_id ? `/api/images/${planning.image_id}` : "https://placehold.co/400"}
        alt={planning.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        {/* Título de la planificación */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{planning.title}</h3>

        {/* Profesional */}
        <p className="text-sm text-gray-500 mb-1">
          <strong>Profesional:</strong> {planning.professional_name}
        </p>

        {/* Descripción corta */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{planning.description}</p>

        {/* Categoría */}
        <p className="text-sm text-gray-500 mb-2">
          <strong>Categoría:</strong> {planning.category_name}
        </p>

        {/* Precio */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#da1641] font-bold">Precio: ${planning.price.toFixed(2)}</span>

          {/* Mostrar botón de eliminar sólo si es profesional */}
          {isProfessional && (
            <button
              onClick={() => onDeleteClick(planning)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              <Trash size={20} />
            </button>
          )}
        </div>

        {/* Botón de ver más */}
        <Link
          to={`/planning/${planning.id}`}
          className="mt-4 block w-full bg-[#da1641] hover:bg-[#C30D35] text-white py-2 rounded-md text-center transition-colors duration-300"
        >
          Ver más
        </Link>
      </div>
    </motion.div>
  );
};