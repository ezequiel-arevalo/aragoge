import TabButton from './TabButton';

const TabsSection = ({ activeTab, setActiveTab, isProfessional }) => (
  <div className="flex justify-center space-x-4 py-4">
    <TabButton title="Información" isActive={activeTab === 'info'} onClick={() => setActiveTab('info')} />
    {isProfessional && (
      <>
        <TabButton title="Planificaciones" isActive={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')} />
        <TabButton title="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </>
    )}
  </div>
);

export default TabsSection;