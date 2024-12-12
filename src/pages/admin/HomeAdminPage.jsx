import { motion } from "framer-motion";
import { Settings, ClipboardList, Users, Briefcase, Tag, DollarSign } from "lucide-react";
import { HeroSection } from '@/components/ui/HeroSection';

const adminSections = [
  { title: "Categorías",      description: "Gestiona las categorías disponibles",     icon: Tag },
  { title: "Planificaciones", description: "Administra las planificaciones creadas",  icon: ClipboardList },
  { title: "Usuarios",        description: "Controla la lista de usuarios",           icon: Users },
  { title: "Profesionales",   description: "Gestiona los profesionales disponibles",  icon: Briefcase },
  { title: "Especialidades",  description: "Administra las especialidades ofrecidas", icon: Settings },
  { title: "Pagos",           description: "Revisa y controla los pagos realizados",  icon: DollarSign },
];

export const HomeAdminPage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSection
        title="Bienvenido al Panel de Administración"
        description="Gestiona los recursos de tu plataforma con facilidad y eficiencia."
        showInput={false}
      />

      {/* Main Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Administra tus recursos
            </h2>
            <p className="text-lg">
              Encuentra todas las herramientas necesarias para gestionar tu plataforma de manera eficiente.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {adminSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  role="article"
                  aria-labelledby={`card-title-${index}`}
                >
                  <div className="bg-red-100 p-3 rounded-full mb-3 flex justify-center">
                    <Icon className="w-5 h-5 text-[#da1641]" />
                  </div>
                  <h3
                    id={`card-title-${index}`}
                    className="text-lg font-semibold text-gray-800 mb-1 text-center"
                  >
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {section.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
