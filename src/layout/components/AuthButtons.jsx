import { NavLink } from 'react-router-dom';

export const AuthButtons = () => {
    return (
        <>
            <NavLink to="/login" className="text-gray-600 hover:text-[#da1641] transition duration-300">
                Iniciar Sesión
            </NavLink>
            <NavLink
                to="/register"
                className="bg-[#da1641] text-white hover:text-white px-4 py-2 rounded-full hover:bg-[#b81235] transition duration-300"
            >
                Registrarse
            </NavLink>
        </>
    );
};