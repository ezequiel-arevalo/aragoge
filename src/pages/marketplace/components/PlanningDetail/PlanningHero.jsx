import { motion } from 'framer-motion';
import { User, Calendar, DollarSign, Tag, Clock } from 'lucide-react'; // Importa el ícono de Star
import { Link } from 'react-router-dom';

export const PlanningHero = ({ planning }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-[#da1641] to-[#ff6b6b] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full h-64 object-cover rounded-lg shadow-2xl"
              src={planning.image_id ? `/api/images/${planning.image_id}` : "https://placehold.co/800x400"}
              alt={planning.title}
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-sm font-semibold mb-2 bg-white/20 inline-block px-2 py-1 rounded text-white">
                Planificación #{planning.id}
              </div>
              <h2 className="text-h2 font-title sm:text-5xl font-bold mb-4">{planning.title}</h2>
              <p className="text-xl mb-6 text-white/80">{planning.synopsis}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <Link 
                    to={`/professional/${planning.professional_id}`} // Cambia la ruta según tu estructura
                    className="text-white hover:text-white hover:underline cursor-pointer"
                  >
                    {planning.professional_name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-white hover:text-white">{new Date(planning.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  <span className="text-white hover:text-white">{planning.category_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-white hover:text-white">{planning.duration} semanas</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <span className="text-4xl font-bold mb-4 sm:mb-0 text-white hover:text-white"> {/* Cambiado a text-white */}
                  <DollarSign className="inline-block h-8 w-8 mr-1" />
                  {planning.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#da1641] hover:bg-white hover:text-[#C30D35] px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg cursor-pointer"
                >
                  Comprar Ahora
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}