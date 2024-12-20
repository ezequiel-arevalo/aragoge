import { useEffect, useState } from "react";
import { fetchCategories } from "@/services/categoryService";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (err) {
        setError("Error al cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/admin"
        className="text-secondary hover:text-secondary underline flex items-center mb-6"
        aria-label="Volver al panel"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver al panel
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Encabezado de la tabla */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Lista de Categorías
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todas las categorías registradas en la
            plataforma.
          </p>
        </div>
        {/* Tabla de categorías */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay categorías registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
