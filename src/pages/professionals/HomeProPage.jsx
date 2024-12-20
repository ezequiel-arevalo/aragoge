import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfessionalPlannings } from '@/redux/plannings/planningsThunks';
import { selectProfessionalItems, selectLoading, selectError } from '@/redux/plannings/planningsSelectors';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PlanningCard from '@/components/ui/PlanningCard';
import Loader from '@/components/Loader';

export const HomeProPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plannings = useSelector(selectProfessionalItems);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Estado local para gestionar las planificaciones
  const [localPlannings, setLocalPlannings] = useState([]);

  useEffect(() => {
    dispatch(fetchProfessionalPlannings());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(plannings)) {
      setLocalPlannings(plannings);
    } else {
      setLocalPlannings([]);
    }
  }, [plannings]);

  const handleDeleteClick = (planning) => {
    navigate(`/professional/delete/${planning.id}`);
  };

  return (
    <>
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-h1 font-title font-bold mb-4">Panel de profesional</h1>
          <h2 className="text-h2 font-title mb-2">Gestiona tus planificaciones y potencia tu carrera fitness</h2>
          <p className="text-xl">Controla y organiza todas tus actividades desde un solo lugar.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/professional/create"
            className="bg-[#da1641] text-white no-global-styles no-styles-global px-6 py-2 rounded-full hover:text-white hover:bg-[#c30d35] transition duration-300 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Crear Planificación
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-red-500 text-lg">Error al cargar las planificaciones. Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        ) : localPlannings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localPlannings.map((planning) => (
              <PlanningCard
                key={planning.id}
                planning={planning}
                isEditable={true}
                onDeleteClick={() => handleDeleteClick(planning)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg">No tienes planificaciones creadas. ¡Empieza creando una nueva planificación!</p>
          </div>
        )}
      </section>
    </>
  );
};