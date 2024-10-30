import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const HeaderSection = ({ user }) => (
  <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#da1641] to-[#ff6b6b] opacity-90">
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          {user.image_id ? (
            <img
              src={user.image_id}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User size={48} className="text-gray-400" />
          )}
        </div>
        <h1 className="text-h2 font-title font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h1>
        <p className="text-lg mb-1">{user.rol_name}</p>
        <p className="text-sm text-gray-300">ID: {user.id}</p>
      </motion.div>
    </div>
  </section>
);

export default HeaderSection;