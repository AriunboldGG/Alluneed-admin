import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
//
import { fileData } from '../../file-thumbnail';

// ----------------------------------------------------------------------

RejectionFiles.propTypes = {
    fileRejections: PropTypes.array,
    isFileTooLarge: PropTypes.bool,
    maximumSize: PropTypes.number,
    maxNumber: PropTypes.number,
};

export default function RejectionFiles({ fileRejections, isFileTooLarge, maximumSize, maxNumber }) {
    if (!fileRejections.length) {
        return null;
    }
    let err = fileRejections.map(({ errors }) => errors[0]);
    let tooMany = err?.filter((error) => error.code === 'too-many-files');

    return (
        <Paper
            variant='outlined'
            sx={{
                py: 1,
                px: 2,
                mt: 3,
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                borderColor: (theme) => alpha(theme.palette.error.main, 0.24),
            }}
        >
            {tooMany.length > 0 ? (
                <Box key={tooMany[0].code} sx={{ my: 1 }}>
                    <Box key={tooMany[0].code} component='span' sx={{ typography: 'caption' }}>
                        {`- Файлын тоо хэтэрч байна. Хамгийн ихдээ ${maxNumber} файл оруулах боломжтой байна.`}
                    </Box>
                </Box>
            ) : (
                <>
                    {fileRejections.map(({ file, errors }) => {
                        const { path, size } = fileData(file);

                        return (
                            <Box key={path} sx={{ my: 1 }}>
                                <Typography variant='subtitle2' noWrap>
                                    {path} - {size ? fData(size) : ''}
                                </Typography>
                                {isFileTooLarge ? (
                                    <Box key={errors[0].code} component='span' sx={{ typography: 'caption' }}>
                                        Файлын хэмжээ хэтэрч байна. {fData(maximumSize)} -аас бага хэмжээтэй файл сонгоно уу
                                    </Box>
                                ) : (
                                    <>
                                        {errors.map((error) => (
                                            <Box key={error.code} component='span' sx={{ typography: 'caption' }}>
                                                - {error.message}
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                        );
                    })}
                </>
            )}
        </Paper>
    );
}
