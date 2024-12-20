import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/redux/user/userActions";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const ProfessionalsView = () => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Despacha la acción para obtener todos los usuarios
    dispatch(fetchAllUsers(localStorage.getItem("accessToken")));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const filteredUsers = allUsers.filter(
    (user) => user.rol_name === "professional"
  );

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
            Lista de Profesionales
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todos los usuarios registrados en la plataforma.
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            user.rol_name === "professional"
                              ? "bg-red-500 text-white hover:text-white"
                              : ""
                          }`}
                        >
                          {user.rol_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/profile/public/${user.id}`}
                            className="text-[#DA1641] underline"
                          >
                            Ver Perfil
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay usuarios registrados con los roles seleccionados.
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
