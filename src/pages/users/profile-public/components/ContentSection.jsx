import { motion } from "framer-motion";
import { PlanningsTab } from "./professional/PlanningsTab";
import { Information } from "./professional/Information";
import { ProfileEdit } from "./professional/ProfileEdit";

const ContentSection = ({ activeTab, user, isProfessional }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      {/* Renderizar el componente de Información si la pestaña activa es "info" */}
      {activeTab === "info" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Information
            user={user}
            isProfessional={user.rol_name === "professional"}
          />
        </motion.div>
      )}

      {/* Renderizar el componente de Planificaciones si es profesional y la pestaña activa es "schedules" */}
      {isProfessional && activeTab === "schedules" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PlanningsTab user={user} />
        </motion.div>
      )}

      {/* Renderizar el componente de Edición de Perfil si es profesional y la pestaña activa es "profile" */}
      {isProfessional && activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProfileEdit user={user} />
        </motion.div>
      )}
    </div>
  );
};

export default ContentSection;
