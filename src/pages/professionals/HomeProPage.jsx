import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfessionalPlannings } from '@/redux/plannings/planningsSlice';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PlanningCard from '@/components/ui/PlanningCard';
import Loader from '@/components/Loader';

export const HomeProPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: plannings, loading, error } = useSelector((state) => state.plannings);
  const [localPlannings, setLocalPlannings] = useState([]);

  useEffect(() => {
    dispatch(fetchProfessionalPlannings());
  }, [dispatch]);

  useEffect(() => {
    setLocalPlannings(plannings);
  }, [plannings]);

  const handleDeleteClick = (planning) => {
    navigate(`/professional/delete/${planning.id}`);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#da1641] to-[#ff6b6b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-h1 font-title font-bold mb-4">Panel de Profesional</h1>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localPlannings.map((planning) => (
              <PlanningCard
                key={planning.id}
                planning={planning}
                isEditable={true}
                onDeleteClick={() => handleDeleteClick(planning)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomeProPage;