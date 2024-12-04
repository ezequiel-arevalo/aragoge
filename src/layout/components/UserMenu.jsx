import { NavLink } from 'react-router-dom';
import { LucideUser } from 'lucide-react';
import { getRoleName } from '@/utilities/roleUtils';

export const UserMenu = ({ user, onLogout }) => {
    return (
        <div className="flex items-center gap-4">
            <NavLink to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-[#da1641]">
                <LucideUser className="w-6 h-6" />
                <div className='flex flex-col'>
                    <span className="text-sm font-medium">{user.first_name} {user.last_name}</span>
                    <span className="text-xs text-gray-500">{getRoleName(user.rol_id)}</span>
                </div>
            </NavLink>
            <button
                onClick={onLogout}
                className="bg-[#da1641] text-white px-4 py-2 rounded-full hover:bg-[#b81235] hover:text-white transition duration-300"
                aria-label="Cerrar Sesión"
            >
                Cerrar Sesión
            </button>
        </div>
    );
};