import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { logoutUserAction } from '@/redux/user/userActions';
import routes from '@/router/routes';

export const useHeaderLogic = () => {
    const { user, accessToken } = useSelector(state => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const getAvailableLinks = useCallback(() => {
        return routes.filter(route => {
            if (route.isAuth && !accessToken) return false;
            if (route.role && user?.rol_id !== route.role) return false;
            if (route.name === 'Login' || route.name === 'Register') return false;
            if (route.name === 'Profile') return false;
            if (route.name === 'ProfilePublic') return false;
            if (route.name === 'Professionales') return false;
            return true;
        });
    }, [user?.rol_id, accessToken]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUserAction()).unwrap();
            toast({
                title: "Sesión cerrada",
                description: "Has cerrado sesión correctamente.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate("/");
        } catch (error) {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            window.location.reload();
        }
    };

    return {
        user,
        accessToken,
        isMenuOpen,
        toggleMenu,
        closeMenu,
        handleLogout,
        availableLinks: getAvailableLinks(),
    };
};