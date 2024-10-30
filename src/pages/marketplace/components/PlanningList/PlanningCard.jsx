import { Link } from "react-router-dom";

export const PlanningCard = ({ id, title, description, price, category, professional }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src="https://placehold.co/400"
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        {/* Título de la planificación */}
        <h3 className="text-h3 font-title font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Profesional */}
        <p className="text-gray-500 text-sm">
          <strong>Profesional:</strong> {professional}
        </p>

        {/* Descripción corta */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>


        {/* Categoría: mantenida en el lugar original */}
        <p className="text-gray-500 text-sm mb-2">
          <strong>Categoría:</strong> {category}
        </p>

        {/* Precio y calificación */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#da1641] font-bold">Precio: ${price}</span>
        </div>

        {/* Botón de "Ver más" usando Link de react-router-dom */}
        <Link
          to={`/planning/${id}`} // Ruta dinámica para el detalle de la planificación
          className="mt-4 block w-full bg-[#da1641] hover:bg-[#C30D35] text-white py-2 rounded-md text-center hover:text-white transition-colors duration-300"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};