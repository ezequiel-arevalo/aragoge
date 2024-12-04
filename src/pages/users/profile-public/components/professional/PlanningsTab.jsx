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
    const professionalId = user?.id; // Asegurarse de que user esté definido
    const plannings = useSelector((state) =>
        selectProfessionalPlanningsById(state, professionalId)
    );
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Estado local para manejar las planificaciones
    const [localPlannings, setLocalPlannings] = useState([]);

    useEffect(() => {
        if (professionalId) {
            dispatch(fetchProfessionalPlanningsByID(professionalId));
        }
    }, [dispatch, professionalId]);

    useEffect(() => {
        // Validar que plannings sea un array antes de actualizar el estado local
        if (Array.isArray(plannings)) {
            setLocalPlannings(plannings);
        } else {
            setLocalPlannings([]);
        }
    }, [plannings]);

    return (
        <div className="mt-4">
            <h1 className="text-h2 font-title font-semibold mb-6">Planificaciones</h1>

            {loading ? (
                <div className="flex justify-center">
                    <Loader />
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">
                    Error al cargar las planificaciones. Por favor, inténtalo de nuevo más tarde.
                </p>
            ) : localPlannings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {localPlannings.map((planning) => (
                        <PlanningCard
                            key={planning.id}
                            planning={planning}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">
                    No hay planificaciones disponibles. ¡Crea una nueva planificación!
                </p>
            )}
        </div>
    );
};

export default PlanningsTab;