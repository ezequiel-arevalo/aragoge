import { motion } from "framer-motion";

const testimonials = [
  {
    text: "“Aragoge revolucionó mi forma de entrenar. Gracias a sus herramientas, logré mejorar mi rendimiento en solo tres meses.”",
    name: "Carlos Gutiérrez",
    role: "Triatleta Profesional",
    image: "./user-1.webp",
  },
  {
    text: "“Nunca pensé que sería posible mantener una rutina constante. Aragoge no solo me motivó, sino que me conectó con entrenadores excelentes.”",
    name: "Ana López",
    role: "Entusiasta del Fitness",
    image: "./user-2.webp",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title text-text-primary font-bold mb-12 text-center">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Iteración sobre los testimonios */}
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Texto del testimonio */}
              <p className="text-text-secondary mb-6 italic min-h-[100px]">
                {testimonial.text}
              </p>
              {/* Información del usuario */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-h3 font-title font-semibold text-text-primary">
                    {testimonial.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
