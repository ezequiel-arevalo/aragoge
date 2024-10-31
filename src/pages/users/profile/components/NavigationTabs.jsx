import { User, Shield, Info, Link as LinkIcon } from 'lucide-react'

const tabs = [
  { id: 'general', label: 'General', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'information', label: 'Information', icon: Info },
  { id: 'public', label: 'Public Profile', icon: LinkIcon },
]

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="pt-20 px-8">
      <div className="flex space-x-4 border-b border-bg-primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 font-font-title text-h6 transition-colors ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-disable hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NavigationTabs