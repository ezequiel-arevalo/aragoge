import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes';
import { MainLayout } from '@/layout/MainLayout';
import * as Pages from '@/pages/index';
import { PlanningDetailPage } from '@/pages/marketplace/components/PlanningDetail/PlanningDetailPage';
import { CreatePlanningPage } from '@/pages/professionals/create/CreatePlanningPage';
import { EditPlanningPage } from '@/pages/professionals/edit/EditPlanningPage';
import { DeletePlanningPage } from '@/pages/professionals/delete/DeletePlanningPage';
import { SubscriptionsPage } from '@/pages/professionals/subscriptions/SubscriptionsPage';
import { ProfilePublicPage } from '@/pages/users/profile-public/ProfilePublicPage';
import { SubscriptionListPage } from '@/pages/users/profile/components/SubscriptionListPage';
import { SubscriptionDetailPage } from '@/pages/users/profile/components/SubscriptionDetailPage';
import { HomeAdminPage } from '@/pages/admin/HomeAdminPage';

export const AppRouter = () => {
  const { user, accessToken } = useSelector(state => state.user);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ path, component, isAuth, role }, index) => {
          const PageComponent = Pages[component];

          // Rutas privadas (requiere autenticación)
          if (isAuth && !accessToken) {
            return <Route key={index} path={path} element={<Navigate to="/login" />} />;
          }

          // Rutas restringidas por rol
          if (role && user?.rol_id !== role) {
            return <Route key={index} path={path} element={<Navigate to="/home" />} />;
          }

          // Rutas públicas y privadas accesibles
          return <Route key={index} path={path} element={<PageComponent />} />;
        })}

        {/* Ruta dinámica para perfil público */}
        <Route path="/profile/public/:id" element={<ProfilePublicPage />} />

        {/* Rutas dinámicas adicionales */}
        <Route path="/planning/:id" element={<PlanningDetailPage />} />
        <Route path="/professional/create" element={<CreatePlanningPage />} />
        <Route path="/professional/edit/:id" element={<EditPlanningPage />} />
        <Route path="/professional/delete/:id" element={<DeletePlanningPage />} />
        <Route path="/professional/subscriptions/:id" element={<SubscriptionsPage />} />

        {/* Rutas dinámicas para suscripciones */}
        <Route path="/subscriptions" element={<SubscriptionListPage />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetailPage />} />;

        <Route path="/admin" element={<HomeAdminPage />} />;

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};