import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Edit, Heart, Star, Eye } from 'lucide-react';

const PlanningCard = ({ planning, isEditable = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="flex flex-col h-full">
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
                to={`/public/profile/${planning.professional_id}`} // Cambiar a /profile/public/${userId}
                className="flex items-center hover:underline"
              >
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

      <div className="bg-gray-50 flex flex-col">
        <Link
          to={`/planning/${planning.id}`}
          className="w-full bg-[#da1641] hover:bg-[#C30D35] text-white hover:text-white py-2 px-4 text-center transition-colors duration-300 font-medium text-sm"
        >
          Ver más
        </Link>
        
        {isEditable && (
          <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200">
            <Link
              to={`/professional/edit/${planning.id}`}
              className="flex items-center justify-center py-2 text-gray-600 hover:text-[#da1641] hover:bg-gray-100 transition duration-300"
            >
              <Edit size={18} />
            </Link>
            <Link
              to={`/professional/delete/${planning.id}`}
              className="flex items-center justify-center py-2 text-gray-600 hover:text-[#da1641] hover:bg-gray-100 transition duration-300"
            >
              <Trash size={18} />
            </Link>
            <Link
              to={`/professional/subscriptions/${planning.id}`}
              className="flex items-center justify-center py-2 text-gray-600 hover:text-[#da1641] hover:bg-gray-100 transition duration-300"
            >
              <Eye size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningCard;