import { Link } from "react-router-dom";
import { Trash, Edit, Star, Eye } from "lucide-react";

const URL = import.meta.env.VITE_API_KEY;

const PlanningCard = ({ planning, isEditable = false }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="flex flex-col h-full">
        {/* Image Section */}

        <div className="relative aspect-[4/3]">
          <img
            src={
              planning.image_id
                ? `${URL}/plannings/${planning.id}/image`
                : "./default-aragoge.webp"
            }
            alt={planning.title}
            className="w-full h-full object-cover rounded-md shadow"
          />
        </div>

        {/* Details Section */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
            {planning.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {planning.synopsis || planning.description}
          </p>

          <div className="mt-auto">
            {/* Price and Category */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#da1641] font-bold text-lg">
                ${planning.price}
              </span>
              <span className="text-gray-800 hover:text-gray-800 text-xs px-3 py-1 bg-gray-100 rounded-full">
                {planning.category_name}
              </span>
            </div>

            {/* Professional and Rating */}
            <div className="flex items-center justify-between">
              <Link
                to={`/profile/public/${planning.user_id}`}
                className="flex items-center hover:underline"
              >
                <span className="text-gray-700 text-sm font-medium">
                  {planning.professional_name}
                </span>
              </Link>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-gray-600 hover:text-gray-600 text-sm">
                  {planning.rating || "4.5"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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
              aria-label={`Editar planificación ${planning.id}`}
            >
              <Edit size={18} />
            </Link>
            <Link
              to={`/professional/delete/${planning.id}`}
              className="flex items-center justify-center py-2 text-gray-600 hover:text-[#da1641] hover:bg-gray-100 transition duration-300"
              aria-label={`Eliminar planificación ${planning.id}`}
            >
              <Trash size={18} />
            </Link>
            <Link
              to={`/professional/subscriptions/${planning.id}`}
              className="flex items-center justify-center py-2 text-gray-600 hover:text-[#da1641] hover:bg-gray-100 transition duration-300"
              aria-label={`Ver suscripciones de la planificación ${planning.id}`}
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
