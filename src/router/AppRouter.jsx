import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes";
import { MainLayout } from "@/layout/MainLayout";
import { HomePage } from "@/pages/common/home/HomePage";
import * as Pages from "@/pages/index";

export const AppRouter = () => {
  const { user, accessToken } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ path, component, isAuth, role }, index) => {
          const PageComponent = Pages[component];

          // Rutas privadas (requieren autenticación)
          if (isAuth && !accessToken) {
            return (
              <Route
                key={index}
                path={path}
                element={<Navigate to="/login" />}
              />
            );
          }

          // Rutas restringidas por rol
          if (role && user?.rol_id !== role) {
            return (
              <Route
                key={index}
                path={path}
                element={<Navigate to="/home" />}
              />
            );
          }

          // Renderizar las rutas
          return <Route key={index} path={path} element={<PageComponent />} />;
        })}

        {/* Redirección por defecto */}
        <Route path="/" element={<HomePage />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};
