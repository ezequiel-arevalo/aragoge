import { motion } from 'framer-motion';

const ContentSection = ({ activeTab, user, isProfessional }) => (
  <div className="p-6 bg-white rounded-lg shadow-md mt-4">
    {activeTab === 'info' && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Información del usuario</h2>
        <p className="text-gray-600 mb-2">Email: {user.email}</p>
        <p className="text-gray-600 mb-2">Rol: {user.rol_name}</p>
        <p className="text-gray-600 mb-2">Miembro desde: {new Date(user.created_at).toLocaleDateString()}</p>
        {!isProfessional && <p className="text-gray-500 mt-4">Este es un usuario sin servicios profesionales.</p>}
      </motion.div>
    )}
    {isProfessional && activeTab === 'schedules' && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Planificaciones</h2>
        <p className="text-gray-500">Aquí se mostrarían las planificaciones del profesional.</p>
      </motion.div>
    )}
    {isProfessional && activeTab === 'services' && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Servicios</h2>
        <p className="text-gray-500">Aquí se mostrarían los servicios ofrecidos por el profesional.</p>
      </motion.div>
    )}
  </div>
);

export default ContentSection;