import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Drawer } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import { NAV } from 'src/config-global';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';
import navConfig from './config-navigation';
import NavDocs from './NavDocs';
import NavAccount from './NavAccount';

NavVertical.propTypes = {
   openNav: PropTypes.bool,
   onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
   const { pathname } = useRouter();

   const isDesktop = useResponsive('up', 'lg');

   useEffect(() => {
      if (openNav) {
         onCloseNav();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname]);

   const renderContent = (
      <Scrollbar
         sx={{
            height: 1,
            '& .simplebar-content': {
               height: 1,
               display: 'flex',
               flexDirection: 'column',
            },
         }}
      >
         <Stack
            spacing={3}
            sx={{
               pt: 3,
               pb: 2,
               px: 2.5,
               flexShrink: 0,
            }}
         >
            <NavAccount />
         </Stack>
         <NavSectionVertical data={navConfig} />
         <Box sx={{ flexGrow: 1 }} />
         <NavDocs />
      </Scrollbar>
   );

   return (
      <Box
         component="nav"
         sx={{
            flexShrink: { lg: 0 },
            width: { lg: NAV.W_DASHBOARD },
         }}
      >
         {isDesktop ? (
            <Drawer
               open
               variant="permanent"
               PaperProps={{
                  sx: {
                     zIndex: 0,
                     width: NAV.W_DASHBOARD,
                     bgcolor: 'transparent',
                     borderRightStyle: 'dashed',
                  },
               }}
            >
               {renderContent}
            </Drawer>
         ) : (
            <Drawer
               open={openNav}
               onClose={onCloseNav}
               ModalProps={{
                  keepMounted: true,
               }}
               PaperProps={{
                  sx: {
                     width: NAV.W_DASHBOARD,
                  },
               }}
            >
               {renderContent}
            </Drawer>
         )}
      </Box>
   );
}
