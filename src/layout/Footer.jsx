import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"; // Importamos los íconos de Lucide
import aragoge from '/aragoge.svg';

const categories = ["Entrenamiento Personal", "Nutrición", "Yoga", "Fisioterapia", "Preparación Física", "Meditación"];

export const Footer = () => {
  return (
    <footer className="bg-[#131211] text-white py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
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
              Aragoge ofrece servicios personalizados para tu bienestar y salud física. Únete a nuestra comunidad y transforma tu vida.
            </p>
          </div>
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category}>
                  <Link
                    to={`/servicios/${category.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition duration-300 text-sm"
                    aria-label={`Ir a servicios de ${category}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Ir a la página Sobre Nosotros"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/carreras"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Ir a la página de Carreras"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Ir al Blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacidad"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Leer la Política de Privacidad"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Leer los Términos de Servicio"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-gray-300 hover:text-white transition duration-300 text-sm"
                  aria-label="Ir a la página de Contacto"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Social Media and Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 Aragoge. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};