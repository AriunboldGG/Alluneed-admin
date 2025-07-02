import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Box, Stack, Button, IconButton, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { UploadIllustration } from '../../assets/illustrations';
import Iconify from '../iconify';
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';
import SingleFileNewPreview from './preview/SingleFileNewPreview';

const StyledDropZone = styled('div')(({ theme }) => ({
    outline: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('padding'),
    backgroundColor: theme.palette.background.neutral,
    border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
    '&:hover': {
        opacity: 0.72,
    },
}));

Upload.propTypes = {
    sx: PropTypes.object,
    error: PropTypes.bool,
    files: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    onDelete: PropTypes.func,
    onRemove: PropTypes.func,
    onUpload: PropTypes.func,
    thumbnail: PropTypes.bool,
    helperText: PropTypes.node,
    onRemoveAll: PropTypes.func,
    acceptedFiles: PropTypes.object,
};

export default function Upload({
    disabled,
    pdfMessage,
    multiple = true,
    error,
    helperText,

    file,
    onDelete,

    files,
    thumbnail,
    onUpload,
    onRemove,
    onRemoveAll,
    sx,
    acceptedFiles = {},
    ...other
}) {
    let { acceptType = {}, maximumSize = 2097152, minimumSize = 0, maxNumber = 10 } = acceptedFiles;
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        multiple,
        disabled,
        maxSize: maximumSize,
        minSize: minimumSize,
        accept: acceptType,
        maxFiles: maxNumber,
        ...other,
    });

    const isFileTooLarge = fileRejections?.length > 0 && fileRejections[0].file?.size > maximumSize;

    const hasFile = !!file && !multiple;

    const hasNewFile = !!files && !multiple;

    const hasFiles = files && multiple && files.length > 0;

    const isError = isDragReject || !!error;

    return (
        <Box sx={{ width: 1, position: 'relative', ...sx }}>
            <StyledDropZone
                {...getRootProps()}
                sx={{
                    ...(isDragActive && {
                        opacity: 0.72,
                    }),
                    ...(isError && {
                        color: 'error.main',
                        bgcolor: 'error.lighter',
                        borderColor: 'error.light',
                    }),
                    ...(disabled && {
                        opacity: 0.48,
                        pointerEvents: 'none',
                    }),
                    ...(hasFile && {
                        padding: '12% 0',
                    }),
                }}
            >
                <input {...getInputProps()} />

                <Placeholder
                    sx={{
                        ...(hasFile && {
                            opacity: 0,
                        }),
                    }}
                />

                {hasFile && <SingleFilePreview file={file} />}
            </StyledDropZone>

            <RejectionFiles fileRejections={fileRejections} isFileTooLarge={isFileTooLarge} maximumSize={maximumSize} maxNumber={maxNumber} />

            {hasFile && onDelete && (
                <IconButton
                    size='small'
                    onClick={onDelete}
                    sx={{
                        top: 16,
                        right: 16,
                        zIndex: 9,
                        position: 'absolute',
                        color: (theme) => alpha(theme.palette.common.white, 0.8),
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                        },
                    }}
                >
                    <Iconify icon='eva:close-fill' width={18} />
                </IconButton>
            )}

            {hasFiles && (
                <>
                    <Box sx={{ my: 3 }}>
                        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
                    </Box>

                    <Stack direction='row' justifyContent='flex-end' spacing={1.5}>
                        {onRemoveAll && (
                            <Button color='error' variant='outlined' size='small' onClick={onRemoveAll}>
                                Арилгах
                            </Button>
                        )}

                        {onUpload && (
                            <Button size='small' variant='contained' onClick={onUpload}>
                                Зураг нэмэх
                            </Button>
                        )}
                    </Stack>
                </>
            )}

            {hasNewFile && (
                <Box sx={{ my: 3 }}>
                    <SingleFileNewPreview files={files[files.length - 1]} onRemove={onRemove} />
                </Box>
            )}

            {helperText && helperText}
        </Box>
    );
}

Placeholder.propTypes = {
    sx: PropTypes.object,
};

function Placeholder({ sx, ...other }) {
    return (
        <Stack
            spacing={2}
            alignItems='center'
            justifyContent='center'
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{
                width: 1,
                textAlign: {
                    xs: 'center',
                    md: 'left',
                },
                ...sx,
            }}
            {...other}
        >
            <UploadIllustration sx={{ width: 220 }} />

            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant='h5'>
                    Файл сонгох
                </Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    <Typography
                        variant='body2'
                        component='span'
                        sx={{
                            mx: 0.5,
                            color: 'primary.main',
                            textDecoration: 'underline',
                        }}
                    >
                        Энд
                    </Typography>
                    дарж та файлаа сонгоно уу
                </Typography>
            </Box>
        </Stack>
    );
}
