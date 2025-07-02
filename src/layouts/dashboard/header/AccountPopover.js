import { useState } from 'react';
import { useRouter } from 'next/router';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
import { PATH_DASHBOARD, PATH_AUTH } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CustomAvatar } from 'src/components/custom-avatar';
import { useSnackbar } from 'src/components/snackbar';
import MenuPopover from 'src/components/menu-popover';
import { IconButtonAnimate } from 'src/components/animate';
import AccountDialog from 'src/sections/Account/AccountDialog';

const OPTIONS = [
    {
        label: 'Хувийн мэдээлэл',
        linkTo: '/',
    },
];

export default function AccountPopover() {
    const { replace, push } = useRouter();
    const [dialogActionType, setDialogActionType] = useState('');

    const {
        handlers: { logOut },
        state: { user },
    } = useAuthContext();

    const { enqueueSnackbar } = useSnackbar();

    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleLogout = async () => {
        try {
            logOut();
            replace(PATH_AUTH.login);
            handleClosePopover();
        } catch (error) {
            enqueueSnackbar('Алдаа гарлаа.Дахин оролдоно уу', { variant: 'warning' });
        }
    };

    const handleUpdate = async () => {
        setDialogActionType('update');
    };

    return (
        <>
            <IconButtonAnimate
                onClick={handleOpenPopover}
                sx={{
                    p: 0,
                    ...(openPopover && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar alt={user?.name} name={user?.name} />
            </IconButtonAnimate>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
                <Stack sx={{ p: 1 }}>
                    {OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={() => handleUpdate()}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Гарах
                </MenuItem>
            </MenuPopover>
            <AccountDialog
                dialogActionType={dialogActionType}
                changeDialogStatus={(e) => {
                    setDialogActionType(e);
                }}
            />
        </>
    );
}
