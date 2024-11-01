import { motion } from 'framer-motion';
import { Trash, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanningCard = ({ planning, onDeleteClick, isEditable = false }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={planning.image_url || "https://placehold.co/400"}
        alt={planning.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-h3 font-title font-semibold text-gray-800 mb-2">{planning.title}</h3>
        <p className="text-gray-500 text-sm">
          <strong>Profesional:</strong> {planning.professional_name}
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{planning.description}</p>
        <p className="text-gray-500 text-sm mb-2">
          <strong>Categoría:</strong> {planning.category_name}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#da1641] font-bold">Precio: ${planning.price}</span>
          {isEditable && (
            <div className="flex space-x-2">
              <Link
                to={`/professional/edit/${planning.id}`}
                className="text-black hover:text-red-700 transition duration-300 no-global-styles no-styles-global"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => onDeleteClick(planning)}
                className="text-red-500 hover:text-red-700 transition duration-300 no-global-styles no-styles-global"
              >
                <Trash size={20} />
              </button>
            </div>
          )}
        </div>
        <Link
          to={`/planning/${planning.id}`}
          className="mt-4 block w-full bg-[#da1641] hover:bg-[#C30D35] text-white py-2 rounded-md text-center hover:text-white transition-colors duration-300"
        >
          Ver más
        </Link>
      </div>
    </motion.div>
  );
};

export default PlanningCard;