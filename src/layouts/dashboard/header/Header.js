import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from 'src/utils/cssStyles';
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
import { HEADER, NAV } from 'src/config-global';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { useAuthContext } from 'src/auth/useAuthContext';

Header.propTypes = {
    onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
    const theme = useTheme();
    const {
        handlers: { logOut },
        state: { user },
    } = useAuthContext();

    const { themeLayout } = useSettingsContext();

    const isNavHorizontal = themeLayout === 'horizontal';

    const isNavMini = themeLayout === 'mini';

    const isDesktop = useResponsive('up', 'lg');

    const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

    const renderContent = (
        <>
            {!isDesktop && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
            )}

            <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end" spacing={{ xs: 0.5, sm: 1.5 }}>
                <Typography
                    variant=""
                    noWrap
                    style={{
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        color: '#212B36',
                        letterSpacing: '0.020em',
                    }}
                >
                    {`${user?.name}`}
                </Typography>
                <AccountPopover />
            </Stack>
        </>
    );

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(isDesktop && {
                    width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
                    height: HEADER.H_DASHBOARD_DESKTOP,
                    ...(isOffset && {
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                    }),
                    ...(isNavHorizontal && {
                        width: 1,
                        bgcolor: 'background.default',
                        height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                        borderBottom: `dashed 1px ${theme.palette.divider}`,
                    }),
                    ...(isNavMini && {
                        width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
                    }),
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}
