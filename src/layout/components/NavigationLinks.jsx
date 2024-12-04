import { NavLink } from 'react-router-dom';

export const NavigationLinks = ({ links, className, onClick }) => {
    return (
        <nav className="max-w-7xl" aria-label="Primary Navigation">
            <ul className={className}>
                {links.map(({ path, name, ariaLabel }, index) => (
                    <li key={index}>
                        <NavLink
                            to={path}
                            onClick={onClick}
                            aria-label={ariaLabel || name}
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-[#da1641] transition duration-300 ${isActive ? 'text-[#da1641]' : ''}`
                            }
                        >
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
