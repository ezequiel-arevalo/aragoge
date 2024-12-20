import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialities } from "@/redux/speciality/specialityActions";
import { selectAllSpecialities, selectSpecialityLoading, selectSpecialityError } from "@/redux/speciality/specialitySelectors";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const SpecialitiesView = () => {
  const dispatch = useDispatch();
  const specialities = useSelector(selectAllSpecialities);
  const loading = useSelector(selectSpecialityLoading);
  const error = useSelector(selectSpecialityError);

  useEffect(() => {
    dispatch(fetchSpecialities());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) return <div>Error: {error}</div>;

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
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Lista de especialidades
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todas las especialidades registradas en la
            plataforma.
          </p>
        </div>
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
                {specialities.length > 0 ? (
                  specialities.map((speciality) => (
                    <tr key={speciality.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {speciality.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {speciality.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay especialidades registradas.
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
