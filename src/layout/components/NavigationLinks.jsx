import { NavLink } from "react-router-dom";

export const NavigationLinks = ({ links, className, onClick }) => {
  return (
    <nav className="max-w-7xl" aria-label="Primary Navigation">
      <ul
        className={`flex flex-col md:flex-row ${className} md:space-x-8 md:items-center`}
      >
        {links.map(({ path, name, ariaLabel }, index) => (
          <li key={index} className="w-full md:w-auto">
            <NavLink
              to={path}
              onClick={onClick}
              aria-label={ariaLabel || name}
              className={({ isActive }) =>
                `block w-full text-center py-4 text-gray-600 hover:text-[#da1641] transition duration-300 ${
                  isActive ? "text-[#da1641]" : ""
                }`
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
