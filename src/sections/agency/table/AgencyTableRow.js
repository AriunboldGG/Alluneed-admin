///React
import { useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
//Mui
import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
///Default
import PropTypes from 'prop-types';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
///Components
import DeleteDialog from 'src/components/DeleteDialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import MenuPopover from 'src/components/menu-popover';

// props
AgencyTableRow.propTypes = {
    row: PropTypes.object.isRequired,
    refreshTable: PropTypes.func,
    handleUpdate: PropTypes.func,
    index: PropTypes.number,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
};

export default function AgencyTableRow({ row, refreshTable, handleUpdate, index, page, rowsPerPage }) {
    const { deleteFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const [confirmModal, setConfirmModal] = useState(false);
    const [openMenu, setOpenMenuActions] = useState(null);

    const { trigger } = useSWRMutation([`agent/${row?.id}`, true], (args) => deleteFetcher(args), {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onSuccess: (newData) => {
            newData?.success && enqueueSnackbar('Амжилттай устгагдсан');
            handleClose();
            refreshTable();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
            handleClose();
        },
    });

    //Functions
    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    const handleOpen = () => {
        setConfirmModal(true);
    };

    const handleClose = () => {
        setConfirmModal(false);
    };

    const showUpDeleteDialog = () => {
        if (confirmModal) {
            return <DeleteDialog handleDeleteRow={trigger} open={confirmModal} close={handleClose} />;
        }
    };

    return (
        <TableRow hover>
            {showUpDeleteDialog()}

            <TableCell align='left'>{page * rowsPerPage + index + 1}</TableCell>

            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.name}
            </TableCell>
            <TableCell align='left'>
                <Label variant='outlined' color='primary'>
                    {row?.phone}
                </Label>
            </TableCell>
            <TableCell align='left'>
                <Label variant={'soft'} color='info'>
                    {row?.email}
                </Label>
            </TableCell>
            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.city}
            </TableCell>
            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.address}
            </TableCell>
            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.areas_of_activity}
            </TableCell>
            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.website}
            </TableCell>
            <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {row?.description}
            </TableCell>
            <TableCell align='center'>
                <IconButton color={openMenu ? 'inherit' : 'default'} onClick={handleOpenMenu}>
                    <Iconify icon='eva:more-vertical-fill' />
                </IconButton>
            </TableCell>
            <MenuPopover open={openMenu} onClose={handleCloseMenu} arrow='right-top' sx={{ width: 140 }}>
                <MenuItem
                    onClick={() => {
                        handleUpdate();
                        handleCloseMenu();
                    }}
                >
                    <Iconify icon='eva:edit-fill' />
                    Засах
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpen();
                        handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon='eva:trash-2-outline' />
                    Устгах
                </MenuItem>
            </MenuPopover>
        </TableRow>
    );
}
