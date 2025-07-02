// react
import { useState } from 'react';
// mui
import { TableRow, TableCell, MenuItem, IconButton } from '@mui/material';
// named import
import { useSnackbar } from 'notistack';
// default import
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
import PropTypes from 'prop-types';
// components
import DeleteDialog from 'src/components/DeleteDialog';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';

SettingsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  refreshTable: PropTypes.func,
  handleUpdate: PropTypes.func,
  index: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default function SettingsTableRow({
  row,
  handleUpdate,
  refreshTable,
  page,
  index,
  rowsPerPage,
}) {
  const [confirmModal, setConfirmModal] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const { deleteFetcher } = useSwrFetcher();
  const { enqueueSnackbar } = useSnackbar();
  const { id, name, field1, field2, field3, description, code } = row;

  // swr
  const { trigger } = useSWRMutation(
    [`/role/${id}`, true],
    (args) => deleteFetcher(args),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess: (newData) => {
        if (newData?.response_code === 200) {
          enqueueSnackbar(newData?.response_msg || 'Амжилттай устгагдсан');
        } else {
          enqueueSnackbar(
            newData?.response_msg || 'Алдаа гарлаа дахин оролдоно уу'
          );
        }
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
    }
  );

  // functions
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

  return (
    <TableRow hover>
      <TableCell align='left'>{page * rowsPerPage + index + 1}</TableCell>
      <TableCell align='left'>{name}</TableCell>
      {/* <TableCell align='left'>{code}</TableCell>
      <TableCell align='left'>{description}</TableCell>
      <TableCell align='left'>{field1}</TableCell>
      <TableCell align='left'>{field2}</TableCell>
      <TableCell align='left'>{field3}</TableCell> */}
      <TableCell align='center'>
        <IconButton
          color={openMenu ? 'inherit' : 'default'}
          onClick={handleOpenMenu}
        >
          <Iconify icon='eva:more-vertical-fill' />
        </IconButton>
      </TableCell>
      <MenuPopover
        open={openMenu}
        onClose={handleCloseMenu}
        arrow='right-top'
        sx={{ width: 140 }}
      >
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
      {confirmModal && (
        <DeleteDialog
          handleDeleteRow={trigger}
          open={confirmModal}
          close={handleClose}
        />
      )}
    </TableRow>
  );
}
