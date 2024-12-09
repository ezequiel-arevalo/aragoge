import { NavLink } from 'react-router-dom';

export const AuthButtons = () => {
    return (
        <div className="auth-buttons flex gap-4" role="navigation" aria-label="Authentication options">
            <NavLink
                to="/login"
                aria-label="Iniciar sesión"
                className={({ isActive }) =>
                    `hover:text-[#da1641] py-2 transition duration-300 ${isActive ? '' : ''}`
                }
            >
                Iniciar Sesión
            </NavLink>
            <NavLink
                to="/register"
                aria-label="Registrarse para crear una cuenta"
                className={({ isActive }) =>
                    `bg-[#da1641] text-white hover:text-white px-4 py-2 rounded-full hover:bg-[#b81235] transition duration-300 ${isActive ? 'ring-2 ring-[#b81235]' : ''
                    }`
                }
            >
                Registrarse
            </NavLink>
        </div>
    );
};
