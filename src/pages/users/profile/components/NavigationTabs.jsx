import { User, Shield, Info, Link as LinkIcon } from 'lucide-react';

const tabs = [
  { id: 'general',     label: 'General',        icon: User     },
  { id: 'security',    label: 'Seguridad',      icon: Shield   },
  { id: 'information', label: 'Subscripciones', icon: Info     },
  { id: 'public',      label: 'Perfil Público', icon: LinkIcon },
];

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="pt-20 px-8">
      {/* Contenedor de las pestañas */}
      <div className="flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-4 space-y-2 md:space-y-0 border-b border-bg-primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center md:justify-start gap-2 px-4 py-2 font-title text-h6 transition-colors w-full md:w-auto ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-disable hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="md:inline text-white hover:text-white">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
