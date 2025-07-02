import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/Iconify';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    dashboard: icon('ic_dashboard'),
};

const navConfig = [
    {
        subheader: 'Системийн удирдлага',
        items: [
            {
                title: 'Хэрэглэгчийн удирдлага',
                path: PATH_DASHBOARD.user.root,
                icon: <Iconify icon='mdi:user' />,
            },
            {
                title: 'Тохиргоо',
                path: PATH_DASHBOARD.role.root,
                icon: <Iconify icon='fluent:window-ad-20-filled' />,
                children: [
                    {
                        title: 'Role тохиргоо',
                        path: PATH_DASHBOARD.role.root,
                    },
                    {
                        title: 'Reference',
                        path: PATH_DASHBOARD.reference.root,
                    },
                ],
            },
            {
                title: 'Campaigns',
                path: PATH_DASHBOARD.campaigns.root,
                icon: <Iconify icon='mdi:user' />,
            },
            {
                title: 'Агент',
                path: PATH_DASHBOARD.agency.root,
                icon: <Iconify icon='mdi:user' />,
            },
        ],
    },
];

export default navConfig;
