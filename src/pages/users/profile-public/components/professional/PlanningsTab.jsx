import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessionalPlanningsByID } from "@/redux/plannings/planningsThunks";
import {
  selectProfessionalPlanningsById,
  selectLoading,
  selectError,
} from "@/redux/plannings/planningsSelectors";
import PlanningCard from "@/components/ui/PlanningCard";
import Loader from "@/components/Loader";

export const PlanningsTab = ({ user }) => {
  const dispatch = useDispatch();
  const professionalId = user?.id; // Asegurarse de que el ID del usuario esté definido
  const plannings = useSelector((state) =>
    selectProfessionalPlanningsById(state, professionalId)
  );
  const loading = useSelector(selectLoading); // Estado de carga
  const error = useSelector(selectError); // Estado de error

  // Estado local para manejar las planificaciones
  const [localPlannings, setLocalPlannings] = useState([]);

  // Efecto para obtener las planificaciones del profesional
  useEffect(() => {
    if (professionalId) {
      dispatch(fetchProfessionalPlanningsByID(professionalId));
    }
  }, [dispatch, professionalId]);

  // Actualizar el estado local cuando las planificaciones cambien
  useEffect(() => {
    if (Array.isArray(plannings)) {
      setLocalPlannings(plannings);
    } else {
      setLocalPlannings([]);
    }
  }, [plannings]);

  return (
    <div className="mt-4">
      <h2 className="text-h2 font-title mb-6 text-center sr-only">
        Planificaciones
      </h2>

      {/* Mostrar un indicador de carga */}
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        // Mostrar mensaje de error si ocurre un problema al cargar las planificaciones
        <p className="text-red-500 text-center">
          Error al cargar las planificaciones. Por favor, inténtalo de nuevo más
          tarde.
        </p>
      ) : localPlannings.length > 0 ? (
        // Renderizar las planificaciones si están disponibles
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localPlannings.map((planning) => (
            <PlanningCard key={planning.id} planning={planning} />
          ))}
        </div>
      ) : (
        // Mostrar mensaje si no hay planificaciones disponibles
        <p className="text-gray-500 text-center">
          No hay planificaciones disponibles. ¡Crea una nueva planificación!
        </p>
      )}
    </div>
  );
};

export default PlanningsTab;
