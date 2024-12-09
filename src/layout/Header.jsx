import { NavigationLinks } from './components/NavigationLinks';
import { UserMenu } from './components/UserMenu';
import { AuthButtons } from './components/AuthButtons';
import { MobileMenuButton } from './components/MobileMenuButton';
import { useHeaderLogic } from './components/useHeaderLogic';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const {
    user,
    accessToken,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleLogout,
    availableLinks,
  } = useHeaderLogic();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <NavLink to="/" className="text-2xl font-bold text-[#da1641]">
          Aragoge
        </NavLink>

        <NavigationLinks
          links={availableLinks}
          className="hidden md:flex flex-row space-x-8"
        />

        {/* Ocultar AuthButtons y UserMenu en mobile */}
        <div className="hidden md:flex items-center space-x-4">
          {!accessToken ? (
            <AuthButtons />
          ) : (
            <UserMenu user={user} onLogout={handleLogout} />
          )}
        </div>

        {/* Botón del menú móvil */}
        <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </nav>

      {/* Menú móvil */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-y-4 mb-4 p-4">
          <NavigationLinks links={availableLinks} onClick={closeMenu} />

          {/* Mostrar AuthButtons o UserMenu en mobile */}
          {!accessToken ? (
            <AuthButtons />
          ) : (
            <UserMenu user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </header>
  );
};
