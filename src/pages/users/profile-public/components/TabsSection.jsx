import { useSelector } from "react-redux";
import TabButton from './TabButton';

const TabsSection = ({ activeTab, setActiveTab, isProfessional, user }) => {

  // Obtener el usuario logueado desde el estado de Redux
  const loggedUser = useSelector((state) => state.user.user);

  // Verificar si el usuario logueado es el dueño del perfil
  const isOwner = loggedUser && loggedUser.id === user.id;

  return (
    <div className="flex justify-center space-x-4 py-4">
      <TabButton title="Información" isActive={activeTab === 'info'} onClick={() => setActiveTab('info')} />

      {isProfessional && isOwner && (
        <TabButton title="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      )}

      {isProfessional && (
        <TabButton title="Planificaciones" isActive={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')} />
      )}
    </div>
  );
};

export default TabsSection;