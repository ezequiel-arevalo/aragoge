import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfessionalPlannings } from '@/redux/plannings/planningsSlice';
import Loader from '@/components/Loader';
import PlanningCard from '@/components/ui/PlanningCard';

export const PlanningsTab = () => {
    const dispatch = useDispatch();
    const { items: plannings, loading, error } = useSelector((state) => state.plannings);

    // Fetch professional plannings on mount
    useEffect(() => {
        dispatch(fetchProfessionalPlannings());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center mt-4">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-4 text-red-500">
                Ocurrió un error al cargar las planificaciones: {error}
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h1 className="text-h2 font-title font-semibold mb-6">Planificaciones</h1>
            {plannings && Array.isArray(plannings) && plannings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plannings.map((planning) => (
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
