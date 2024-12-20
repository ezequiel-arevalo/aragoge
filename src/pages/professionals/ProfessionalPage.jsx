import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessionalsAction } from "@/redux/professional/professionalActions";
import { HeroSection } from "@/components/ui/HeroSection";
import Loader from "@/components/Loader";
import ConnectionError from "@/components/ui/ConnectionError";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
const URL = import.meta.env.VITE_API_KEY;

export const ProfessionalPage = () => {
  const dispatch = useDispatch();
  const { professionals, loading, error } = useSelector(
    (state) => state.professional
  );

  useEffect(() => {
    dispatch(fetchProfessionalsAction());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-auto m-4 max-w-[520px]">
        <ConnectionError />
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title="Lista de profesionales"
        description="Descubre a todos nuestros profesionales"
        showInput={false}
      />
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Profesionales destacados
        </h2>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto">
            {Array.isArray(professionals) && professionals.length > 0 ? (
              professionals.map((professional) => (
                <div
                  key={professional.id}
                  className="flex flex-col sm:flex-row overflow-hidden border border-gray-300 rounded-lg"
                >
                  <div className="flex justify-center items-center p-4 bg-primary opacity-90 min-w-[200px]">
                    <div className="w-[150px] h-[150px] rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      {professional.image_id ? (
                        <img
                          src={`${URL}/users/${professional.id}/cover`}
                          alt={`${professional.first_name} ${professional.last_name}`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User size={64} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {professional.first_name} {professional.last_name}
                      </h3>
                      {professional.professional_data?.specialty_name && (
                        <p className="inline-flex items-center text-secondary font-semibold mt-2">
                          Especialidad:{" "}
                          {professional.professional_data.specialty_name}
                        </p>
                      )}
                      {professional.professional_data?.description && (
                        <p className="py-2">
                          <strong>Descripción:</strong>{" "}
                          {professional.professional_data.description}
                        </p>
                      )}
                      {professional.professional_data?.synopsis && (
                        <p className="italic text-gray-600 py-2">
                          "{professional.professional_data.synopsis}"
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/profile/public/${professional.id}`}
                        className="text-center bg-[#da1641] hover:text-white text-white px-4 py-2 rounded-full hover:bg-[#c30d35] transition duration-300"
                      >
                        Ver Perfil
                      </Link>
                      <p className="text-xs text-gray-800 flex items-center">
                        <Calendar size={14} className="mr-2" /> Se unió el:{" "}
                        {new Date(professional.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-500 col-span-2">
                No se encontraron profesionales.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
