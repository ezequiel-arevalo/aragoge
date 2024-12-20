import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopSubscribedProfessionalsAction } from "@/redux/professional/ProfessionalActions";
import { selectProfessionals, selectProfessionalLoading } from "@/redux/professional/ProfessionalSelectors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import { User } from "lucide-react";

// Constante para la URL base
const URL = import.meta.env.VITE_API_KEY;

export const FeaturedTrainersSection = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const professionals = useSelector(selectProfessionals); // Selecciona los profesionales del estado global
  const loading = useSelector(selectProfessionalLoading); // Selecciona el estado de carga

  useEffect(() => {
    // Despacha una acción para obtener los profesionales más suscritos
    dispatch(fetchTopSubscribedProfessionalsAction(4));
  }, [dispatch]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title font-bold mb-8 text-center">
          Profesionales destacados
        </h2>
        {loading ? (
          <Loader />
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
