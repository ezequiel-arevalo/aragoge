import aragoge from "/aragoge.svg";

// Definimos las categorías de servicios
const categories = [
  "Entrenamiento Personal",
  "Nutrición",
  "Yoga",
  "Fisioterapia",
  "Preparación Física",
  "Meditación",
];

// Componente de pie de página
export const Footer = () => {
  return (
    <footer
      className="bg-[#131211] text-white py-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div>
            <img
              src={aragoge}
              alt="Logotipo de Aragoge"
              width="96"
              height="96"
              className="w-24 h-auto mb-4"
              loading="lazy"
            />
            <p className="text-sm text-gray-400">
              Aragoge ofrece servicios personalizados para tu bienestar y salud
              física. Únete a nuestra comunidad y transforma tu vida.
            </p>
          </div>
          {/* Sección de Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category}>
                  <span
                    className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                    aria-label={`Información sobre ${category}`}
                    role="button"
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Sección de Compañía */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2">
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información sobre la compañía"
                  role="button"
                >
                  Sobre Nosotros
                </span>
              </li>
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información sobre carreras"
                  role="button"
                >
                  Carreras
                </span>
              </li>
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información sobre el blog"
                  role="button"
                >
                  Blog
                </span>
              </li>
            </ul>
          </div>
          {/* Sección Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información sobre la política de privacidad"
                  role="button"
                >
                  Política de Privacidad
                </span>
              </li>
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información sobre los términos de servicio"
                  role="button"
                >
                  Términos de Servicio
                </span>
              </li>
              <li>
                <span
                  className="text-gray-300 hover:text-white transition duration-300 text-sm cursor-pointer"
                  aria-label="Información de contacto"
                  role="button"
                >
                  Contacto
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Derechos de Autor */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 Aragoge. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
