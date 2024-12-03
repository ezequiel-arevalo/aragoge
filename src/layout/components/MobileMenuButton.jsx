import { LucideMenu, LucideX } from 'lucide-react';

export const MobileMenuButton = ({ isOpen, onClick }) => {
    return (
        <button
            className="text-2xl md:hidden no-global-styles no-stlyes-global"
            onClick={onClick}
            aria-label={isOpen ? 'Cerrar Menú' : 'Abrir Menú'}
        >
            {isOpen ? <LucideX /> : <LucideMenu />}
        </button>
    );
};