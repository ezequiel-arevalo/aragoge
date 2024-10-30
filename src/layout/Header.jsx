import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { LucideMenu, LucideX, LucideUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '@/redux/user/userSlice';
import routes from '@/router/routes';

export const Header = () => {
  const { user, accessToken } = useSelector(state => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const filteredLinks = routes.filter(route => {
    if (route.isAuth && !accessToken) return false;
    if (route.role && user?.rol_id !== route.role) return false;
    if (route.name === 'Login' || route.name === 'Register') return false;
    if (route.name === 'ProfilePublic') return false;
    return route.name;
  });

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAction()).unwrap();
      alert("Cerraste sesión con éxito.");
      console.info("Cerraste sesión correctamente.");
      navigate("/");
    } catch (error) {
      alert("Error al cerrar sesión: Error desconocido");
      console.info("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <NavLink to="/" className="text-2xl font-bold text-[#da1641]">
          Aragoge
        </NavLink>

        <ul className="hidden md:flex flex-row space-x-8">
          {filteredLinks.map(({ path, name }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-[#da1641] transition duration-300 ${isActive ? 'text-[#da1641]' : ''}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          {!accessToken ? (
            <>
              <NavLink to="/login" className="text-gray-600 hover:text-[#da1641] transition duration-300">
                Iniciar Sesión
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#da1641] text-white px-4 py-2 rounded-full hover:bg-[#b81235] transition duration-300"
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-[#da1641]">
                <LucideUser className="w-6 h-6" />
                <span className='no-global-styles no-styles-global'>{user.first_name}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-[#da1641] text-white px-4 py-2 rounded-full hover:bg-[#b81235] hover:text-white transition duration-300"
                aria-label="Cerrar Sesión"
              >
                Cerrar Sesión
              </button>
            </div>
          )}

          <button
            className="text-2xl md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
          >
            {isMenuOpen ? <LucideX /> : <LucideMenu />}
          </button>
        </div>
      </nav>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center space-y-4 mb-4 p-4">
          {filteredLinks.map(({ path, name }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-[#da1641] transition duration-300 ${isActive ? 'text-[#da1641]' : ''}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};