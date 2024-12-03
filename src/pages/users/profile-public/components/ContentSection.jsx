import { useState } from "react";
import { motion } from "framer-motion";
import { PlanningsTab } from "./professional/PlanningsTab";
import { Information } from "./professional/Information";
import { ProfileEdit } from "./professional/ProfileEdit";

const ContentSection = ({ activeTab, user, isProfessional }) => {
  const [activeProfileComponent, setActiveProfileComponent] = useState(null);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      {activeTab === "info" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Information user={user} isProfessional={isProfessional} />
        </motion.div>
      )}
      {isProfessional && activeTab === "schedules" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PlanningsTab user={user} />
        </motion.div>
      )}
      {isProfessional && activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProfileEdit />
        </motion.div>
      )}
    </div>
  );
};

export default ContentSection;