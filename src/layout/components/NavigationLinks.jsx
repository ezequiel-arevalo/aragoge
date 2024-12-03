import { NavLink } from 'react-router-dom';

export const NavigationLinks = ({ links, className, onClick }) => {
    return (
        <ul className={className}>
            {links.map(({ path, name }, index) => (
                <li key={index}>
                    <NavLink
                        to={path}
                        onClick={onClick}
                        className={({ isActive }) =>
                            `text-gray-600 hover:text-[#da1641] transition duration-300 ${isActive ? 'text-[#da1641]' : ''}`
                        }
                    >
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};