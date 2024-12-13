import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopSubscribedProfessionalsAction } from "@/redux/professional/professionalActions";
import { selectProfessionals, selectProfessionalLoading } from "@/redux/professional/professionalSelectors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const URL = import.meta.env.VITE_API_KEY;

export const FeaturedTrainersSection = () => {
  const dispatch = useDispatch();
  const professionals = useSelector(selectProfessionals);
  const loading = useSelector(selectProfessionalLoading);

  useEffect(() => {
    dispatch(fetchTopSubscribedProfessionalsAction(4));
  }, [dispatch]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title font-bold mb-8 text-center">
          Profesionales Destacados
        </h2>
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {professionals.map((professional, index) => (
                <motion.div
                  key={professional.id}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mt-4">
                    {/* Imagen redonda */}
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                      <img
                        src={
                          `${URL}/users/${professional.id}/cover` ||
                          "https://placehold.co/150x150"
                        }
                        alt={`${professional.first_name} ${professional.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-h3 font-title font-bold mb-2 text-center">
                      {professional.first_name} {professional.last_name}
                    </h3>
                    <p className="text-p text-gray-600 mb-4 text-center">
                      {professional.rol_name}
                    </p>
                    <div className="flex justify-center items-center">
                      <Link
                        to={`/profile/public/${professional.id}`}
                        className="w-full text-center bg-[#da1641] text-white hover:text-white px-4 py-2 rounded-full hover:bg-[#c30d35] transition duration-300"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/professionals"
                className="inline-flex items-center text-[#da1641] font-semibold hover:underline"
              >
                Ver todos los profesionales
                <span className="ml-2">→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};