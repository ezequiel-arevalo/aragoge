import TabButton from './TabButton';

const TabsSection = ({ activeTab, setActiveTab, isProfessional }) => (
  <div className="flex justify-center space-x-4 py-4">
    <TabButton title="Información" isActive={activeTab === 'info'} onClick={() => setActiveTab('info')} />
    {isProfessional && (
      <>
        <TabButton title="Planificaciones" isActive={activeTab === 'schedules'} onClick={() => setActiveTab('schedules')} />
        <TabButton title="Servicios" isActive={activeTab === 'services'} onClick={() => setActiveTab('services')} />
      </>
    )}
  </div>
);

export default TabsSection;