function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    forgotPassword: path(ROOTS_AUTH, '/forgotPassword'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,

    role: {
        root: path(ROOTS_DASHBOARD, '/role'),
        table: path(ROOTS_DASHBOARD, '/role/table'),
    },
    reference: {
        root: path(ROOTS_DASHBOARD, '/reference'),
        table: path(ROOTS_DASHBOARD, '/reference/table'),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        table: path(ROOTS_DASHBOARD, '/user/table'),
    },
    campaigns: {
        root: path(ROOTS_DASHBOARD, '/campaigns'),
        table: path(ROOTS_DASHBOARD, '/campaigns/table'),
    },
    agency: {
        root: path(ROOTS_DASHBOARD, '/agency'),
        table: path(ROOTS_DASHBOARD, '/agency/table'),
    },
};
