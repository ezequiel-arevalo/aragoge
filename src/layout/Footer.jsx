import { Link } from "react-router-dom";

const categories = ["Entrenamiento Personal", "Nutrición", "Yoga", "Fisioterapia", "Preparación Física", "Meditación"]

export const Footer = () => {
  return (
      <footer className="bg-white text-[#131211] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-h3 font-title font-semibold mb-4">Aragoge</h3>
              <p className="text-[#131211] text-sm">Conectando atletas y profesionales del fitness</p>
            </div>
            <div>
              <h4 className="text-h4 font-title font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <li key={category}>
                    <Link to={`/servicios/${category.toLowerCase()}`} className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-h4 font-title font-semibold mb-4">Compañía</h4>
              <ul className="space-y-2">
                <li><Link to="/sobre-nosotros" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Sobre Nosotros</Link></li>
                <li><Link to="/carreras" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Carreras</Link></li>
                <li><Link to="/blog" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-h4 font-title font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacidad" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Política de Privacidad</Link></li>
                <li><Link to="/terminos" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Términos de Servicio</Link></li>
                <li><Link to="/contacto" className="text-[#131211] hover:text-[#DA1641] transition duration-300 text-sm">Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Aragoge. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
  )
}