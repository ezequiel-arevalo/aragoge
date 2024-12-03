export const getRoleHomePath = (rolId) => {
    switch (parseInt(rolId)) {
        case 1:
            return '/admin';
        case 2:
            return '/home';
        case 3:
            return '/professional';
        default:
            return '/home';
    }
};

export const getRoleName = (rolId) => {
    switch (parseInt(rolId)) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Atleta';
        case 3:
            return 'Profesional';
        default:
            return 'Usuario';
    }
};