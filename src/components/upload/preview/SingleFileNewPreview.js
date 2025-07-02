import { m, AnimatePresence } from 'framer-motion';
import { IconButton, Stack, Typography } from '@mui/material';
import { fData } from 'src/utils/formatNumber';
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
import PropTypes from 'prop-types';
import Iconify from '../../iconify';

SingleFileNew.propTypes = {
    sx: PropTypes.object,
    files: PropTypes.object,
    onRemove: PropTypes.func,
};

export default function SingleFileNew({ files, onRemove, sx }) {
    if (!files) {
        return null;
    }
    const { key, name = '', size = 0 } = fileData(files);
    const isNotFormatFile = typeof files === 'string';

    return (
        <AnimatePresence initial={false}>
            <Stack
                key={key}
                component={m.div}
                {...varFade().inUp}
                spacing={2}
                direction='row'
                alignItems='center'
                sx={{
                    my: 1,
                    px: 1,
                    py: 0.75,
                    borderRadius: 0.75,
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                    ...sx,
                }}
            >
                <FileThumbnail file={files} />

                <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                    <Typography variant='subtitle2' noWrap>
                        {isNotFormatFile ? files : name}
                    </Typography>

                    <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        {isNotFormatFile ? '' : fData(size)}
                    </Typography>
                </Stack>

                {onRemove && (
                    <IconButton edge='end' size='small' onClick={() => onRemove(files)}>
                        <Iconify icon='eva:close-fill' />
                    </IconButton>
                )}
            </Stack>
        </AnimatePresence>
    );
}
