import { motion } from "framer-motion";
import { User } from "lucide-react";
const URL = import.meta.env.VITE_API_KEY;

const HeaderSection = ({ user }) => (
  <section className="relative overflow-hidden py-20 bg-primary">
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="w-[150px] h-[150px] rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          {user.image_id ? (
            <img
              src={`${URL}/users/${user.id}/cover`}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User size={64} className="text-gray-400" />
          )}
        </div>
        <h1 className="text-h1 font-title font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h1>
        <p className="text-lg mb-1">{user.rol_name}</p>
      </motion.div>
    </div>
  </section>
);

export default HeaderSection;
