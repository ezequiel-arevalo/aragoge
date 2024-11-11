import { Mail, Calendar, Shield, Save } from 'lucide-react';
import formatDate from '@/utilities/formatDate';

const GeneralTab = ({ formData, handleInputChange, handleSave, userData, roles }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-text-primary font-font-title text-h6 mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-text-primary font-font-title text-h6 mb-2">
            Apellido
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-text-primary font-font-title text-h6 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-text-primary font-font-title text-h6 mb-2">
            <Shield className="w-4 h-4 inline mr-2" />
            Rol
          </label>
          <select
            name="rol_id"
            value={formData.rol_id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-text-primary font-font-title text-h6 mb-2">
          <Calendar className="w-4 h-4 inline mr-2" />
          Fecha de creación
        </label>
        <input
          type="text"
          value={formatDate(userData.created_at)}
          disabled
          className="w-full px-4 py-2 rounded-lg border border-bg-primary bg-bg-primary text-text-disable"
        />
      </div>
      <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
        <Save className="w-4 h-4" />
        Guardar cambios
      </button>
    </div>
  );
};

export default GeneralTab;