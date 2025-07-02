// mui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, CircularProgress } from '@mui/material';
// named import
import { HOST_API_KEY } from 'src/config-global';
// default import
import PropTypes from 'prop-types';
// components
import FileThumbnail from 'src/components/file-thumbnail';
import Iconify from 'src/components/iconify';

FileFullSize.propTypes = {
    title: PropTypes.string,
    file_url: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default function FileFullSize({ title = '', open, onClose, file_url }) {
    return (
        <Dialog open={open} onClose={onClose} sx={{ p: 5 }} maxWidth='sm' fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 3 }}>
                    <FileThumbnail file={`${HOST_API_KEY}static-file${file_url}`} imageView />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color='inherit' size='medium' startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
                    {'Хаах'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
