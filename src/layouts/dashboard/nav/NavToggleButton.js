import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import { NAV } from 'src/config-global';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

NavToggleButton.propTypes = {
  sx: PropTypes.object,
};

export default function NavToggleButton({ sx, ...other }) {
  const { themeLayout, onToggleLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  if (!isDesktop) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={onToggleLayout}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: NAV.W_DASHBOARD - 12,
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={themeLayout === 'vertical' ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </IconButton>
  );
}
