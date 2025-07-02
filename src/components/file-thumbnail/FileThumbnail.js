import PropTypes from 'prop-types';
// @mui
import { Box, Tooltip, Stack } from '@mui/material';
//
import { fileData, fileFormat, fileThumb } from 'src/components/file-thumbnail/utils';
import DownloadButton from 'src/components/file-thumbnail/DownloadButton';

// ----------------------------------------------------------------------

FileThumbnail.propTypes = {
    sx: PropTypes.object,
    imgSx: PropTypes.object,
    tooltip: PropTypes.bool,
    imageView: PropTypes.bool,
    onDownload: PropTypes.func,
    wSize: PropTypes.number,
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function FileThumbnail({ file, tooltip, imageView, onDownload, sx, imgSx, wSize }) {
    const { name = '', path = '', preview = '' } = fileData(file);

    const format = fileFormat(path || preview);

    const renderContent =
        format === 'image' && imageView ? (
            <Box
                component='img'
                src={preview}
                sx={{
                    flexShrink: 0,
                    ...imgSx,
                }}
            />
        ) : format === 'svg' && imageView ? (
            <>
                {wSize ? (
                    <Box
                        component='img'
                        src={preview.replace(`w-${wSize}`, '')}
                        sx={{
                            width: wSize,
                            height: wSize,
                            flexShrink: 0,
                            ...sx,
                        }}
                    />
                ) : (
                    <Box
                        component='img'
                        src={preview}
                        sx={{
                            width: 1,
                            height: 1,
                            flexShrink: 0,
                            ...sx,
                        }}
                    />
                )}
            </>
        ) : (
            <>
                {wSize ? (
                    <Box
                        component='img'
                        src={fileThumb(format)}
                        sx={{
                            width: wSize,
                            height: wSize,
                            flexShrink: 0,
                            ...sx,
                        }}
                    />
                ) : (
                    <Box
                        component='img'
                        src={fileThumb(format)}
                        sx={{
                            width: 32,
                            height: 32,
                            flexShrink: 0,
                            ...sx,
                        }}
                    />
                )}
            </>
        );

    if (tooltip) {
        return (
            <Tooltip title={name}>
                <Stack
                    flexShrink={0}
                    component='span'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        width: 'fit-content',
                        height: 'inherit',
                    }}
                >
                    {renderContent}
                    {onDownload && <DownloadButton onDownload={onDownload} />}
                </Stack>
            </Tooltip>
        );
    }

    return (
        <>
            {renderContent}
            {onDownload && <DownloadButton onDownload={onDownload} />}
        </>
    );
}
