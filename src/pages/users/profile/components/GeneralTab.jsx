import { Mail, Calendar, Shield, Save } from 'lucide-react';
import formatDate from '@/utilities/formatDate';

const GeneralTab = ({ formData, handleInputChange, handleSave, userData, roles }) => {
  return (
    <div className="space-y-6">
      {/* Título principal del formulario */}
      <h2 className="text-h2 font-title font-bold mb-4">Editar información general</h2>

      {/* Contenedor del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo: Nombre */}
        <div>
          <h6 className="text-h6 font-title mb-2">Nombre</h6>
          <label htmlFor="first_name" className="sr-only">Nombre</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          />
        </div>

        {/* Campo: Apellido */}
        <div>
          <h6 className="text-h6 font-title mb-2">Apellido</h6>
          <label htmlFor="last_name" className="sr-only">Apellido</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          />
        </div>

        {/* Campo: Email */}
        <div>
          <h6 className="text-h6 font-title mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </h6>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            className="w-full px-4 py-2 rounded-lg border border-bg-primary bg-bg-primary text-text-disable"
          />
        </div>

        {/* Campo: Rol */}
        <div>
          <h6 className="text-h6 font-title mb-2">
            <Shield className="w-4 h-4 inline mr-2" />
            Rol
          </h6>
          <label htmlFor="rol_id" className="sr-only">Rol</label>
          <select
            id="rol_id"
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

      {/* Campo: Fecha de creación */}
      <div>
        <h6 className="text-h6 font-title mb-2">
          <Calendar className="w-4 h-4 inline mr-2" />
          Fecha de creación
        </h6>
        <label htmlFor="created_at" className="sr-only">Fecha de creación</label>
        <input
          id="created_at"
          type="text"
          value={formatDate(userData.created_at)}
          disabled
          className="w-full px-4 py-2 rounded-lg border border-bg-primary bg-bg-primary text-text-disable"
        />
      </div>

      {/* Botón para guardar */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        <Save className="w-4 h-4" />
        Guardar cambios
      </button>
    </div>
  );
};

export default GeneralTab;