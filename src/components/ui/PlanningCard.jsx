import { motion } from 'framer-motion';
import { Trash, Edit, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PlanningCard = ({ planning, onDeleteClick, isEditable = false }) => {
  console.log(planning)
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Aquí iría la lógica para añadir/quitar de favoritos
    console.log('Toggle favorite for:', planning.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        {/* Imagen y botón de favoritos */}
        <div className="relative">
          <img
            src={planning.image_url || "https://placehold.co/400"}
            alt={planning.title}
            className="w-full h-56 object-cover"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:bg-white"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-[#da1641] fill-[#da1641]' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Contenido principal */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{planning.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{planning.synopsis || planning.description}</p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#da1641] font-bold text-lg">${planning.price}</span>
              <span className="text-gray-500 text-xs px-3 py-1 bg-gray-100 rounded-full">{planning.category_name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Link
                to={`/public/profile/${planning.professional_id}`}
                className="flex items-center hover:underline"
              >
                <img
                  src={planning.professional_avatar || "https://placehold.co/40"}
                  alt={planning.professional_name}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-gray-700 text-sm font-medium">{planning.professional_name}</span>
              </Link>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-gray-600 text-sm">{planning.rating || '4.5'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con botones de acción */}
      <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
        <Link
          to={`/planning/${planning.id}`}
          className="flex-grow bg-[#da1641] hover:bg-[#C30D35] hover:text-white text-white py-2 px-4 rounded-lg text-center transition-colors duration-300 font-medium text-sm"
        >
          Ver más
        </Link>
        {isEditable && (
          <div className="flex space-x-3 ml-4">
            <Link
              to={`/professional/edit/${planning.id}`}
              className="text-gray-600 hover:text-[#da1641] transition duration-300 p-2 hover:bg-gray-100 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteClick(planning);
              }}
              className="text-gray-600 hover:text-red-600 transition duration-300 p-2 hover:bg-gray-100 rounded-full no-global-styles"
            >
              <Trash size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlanningCard;