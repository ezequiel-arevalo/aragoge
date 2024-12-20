import { NavigationLinks } from "./components/NavigationLinks";
import { UserMenu } from "./components/UserMenu";
import { AuthButtons } from "./components/AuthButtons";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { useHeaderLogic } from "./components/useHeaderLogic";
import { NavLink } from "react-router-dom";
import aragoge from "/aragoge-black.svg";

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
        {/* Logo */}
        <NavLink
          to="/"
          className="inline-flex items-center text-2xl font-bold text-primary hover:text-primary uppercase logo-titulado"
        >
          <img
            src={aragoge}
            alt="Logotipo de Aragoge"
            width="10"
            height="10"
            className="w-10 h-auto mb-[5px] mr-[-4px]"
          />
          <span className="logo-titulado">ragoge</span>
        </NavLink>

        {/* Navegación principal */}
        <NavigationLinks
          links={availableLinks}
          className="hidden md:flex flex-row space-x-8"
        />

        {/* AuthButtons o UserMenu en desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!accessToken ? (
            <AuthButtons />
          ) : (
            <UserMenu user={user} onLogout={handleLogout} />
          )}
        </div>

        {/* Botón para abrir/cerrar el menú móvil */}
        <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden block">
          <div className="flex flex-col items-center space-y-4 mb-4 p-4">
            <NavigationLinks links={availableLinks} onClick={closeMenu} />

            {/* AuthButtons o UserMenu en mobile */}
            {!accessToken ? (
              <AuthButtons />
            ) : (
              <UserMenu user={user} onLogout={handleLogout} />
            )}
          </div>
        </div>
      )}
    </header>
  );
};
