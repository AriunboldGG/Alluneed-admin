export const paths = [
    {
        role: ['admin', 'superadmin', 'reporter'],
        path: [
            {
                matchList: true,
                name: '/dashboard',
            },
        ],
    },
    {
        role: ['admin'],
        path: [
            {
                matchList: false,
                name: '/dada',
            },
        ],
    },
];
