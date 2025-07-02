import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import AuthGuard from 'src/auth/AuthGuard';
import { useSettingsContext } from 'src/components/settings';
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import { useAuthContext } from 'src/auth/useAuthContext';
import { mockAuth } from 'src/utils/mockData';

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default function DashboardLayout({ children, headTitle }) {
    const { themeLayout } = useSettingsContext();
    const isDesktop = useResponsive('up', 'lg');
    const [open, setOpen] = useState(false);
    const isNavHorizontal = themeLayout === 'horizontal';
    const isNavMini = themeLayout === 'mini';
    const {
        handlers: { stateDynamicUpdate },
        state: { userToken },
    } = useAuthContext();

    useEffect(() => {
        getUserInfo();
    }, [userToken]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getUserInfo = async () => {
        if (userToken) {
            try {
                const response = await mockAuth.getUserInfo(userToken);
                if (response?.success) {
                    stateDynamicUpdate({ type: 'user', value: response.data });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }
    };

    const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

    const renderContent = () => {
        if (isNavHorizontal) {
            return (
                <>
                    <Header onOpenNav={handleOpen} />

                    {isDesktop ? <NavHorizontal /> : renderNavVertical}

                    <Main>{children}</Main>
                </>
            );
        }
        if (isNavMini) {
            return (
                <>
                    <Header onOpenNav={handleOpen} />
                    <Box
                        sx={{
                            display: { lg: 'flex' },
                            minHeight: { lg: 1 },
                        }}
                    >
                        {isDesktop ? <NavMini /> : renderNavVertical}
                        <Main>{children}</Main>
                    </Box>
                </>
            );
        }
        return (
            <>
                <Header onOpenNav={handleOpen} />
                <Box
                    sx={{
                        display: { lg: 'flex' },
                        minHeight: { lg: 1 },
                    }}
                >
                    {renderNavVertical}

                    <Main>{children}</Main>
                </Box>
            </>
        );
    };

    return (
        <AuthGuard>
            <Head>
                <title>{headTitle || `Удирдах хуудас`}</title>
            </Head>
            {renderContent()}
        </AuthGuard>
    );
}
