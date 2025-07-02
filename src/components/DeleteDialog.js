import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import PropTypes from 'prop-types';

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  handleDeleteRow: PropTypes.func,
};

export default function DeleteDialog({ open, close, handleDeleteRow }) {
  return (
    <>
      <Dialog open={open} onClose={close} maxWidth='md'>
        <DialogTitle>Устгах үйлдэл баталгаажуулах</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id='alert-dialog-description'>
            Та устгах үйлдэл хийхдээ итгэлтэй байна уу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={close} autoFocus color='inherit'>
            Үгүй, цуцлах
          </Button>
          <Button variant='contained' color='error' onClick={handleDeleteRow}>
            Тийм, устгах
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
