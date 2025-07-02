import { useState } from 'react';
// mui
import { Stack, Box, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// named import
import { HOST_API_KEY } from 'src/config-global';
// default import
import PropTypes from 'prop-types';
// components
import Iconify from 'src/components/iconify';
import FileMedia from 'src/components/file';
// section
import { acceptType, backgroundProperty } from './utils/schema';

BackgroundImage.propTypes = {
    onFiles: PropTypes.func,
};

export default function BackgroundImage({ onFiles }) {
    const [visible, setVisible] = useState(false);
    const [properties, setProperties] = useState({
        backgroundPosition: 'Сонгох',
        backgroundRepeat: 'Сонгох',
        backgroundSize: 'Сонгох',
        type: 'image',
        url: '',
    });
    const [sendData, setSendData] = useState({
        backgroundPosition: '',
        backgroundRepeat: '',
        backgroundSize: '',
        type: 'image',
        url: '',
    });

    // functions
    const onSubmit = async () => {
        try {
            onFiles(sendData);
        } catch (e) {
            return;
        }
    };

    const handleFiles = (event) => {
        try {
            event && setVisible(true);
            let imageUrl = `${HOST_API_KEY}static-file${event}`;
            setProperties({ ...properties, url: imageUrl });
            setSendData({ ...sendData, url: imageUrl });
        } catch (e) {
            return;
        }
    };

    const handleChange = (name, value) => {
        setProperties({ ...properties, [name]: value });
        setSendData({ ...sendData, [name]: value });
    };

    const handleValues = () => {
        setSendData(properties);
        properties.backgroundPosition === 'Сонгох' && setSendData({ ...sendData, backgroundPosition: '' });
        properties.backgroundRepeat === 'Сонгох' && setSendData({ ...sendData, backgroundRepeat: '' });
        properties.backgroundSize === 'Сонгох' && setSendData({ ...sendData, backgroundSize: '' });
        onSubmit();
    };

    return (
        <>
            <FileMedia
                onFiles={handleFiles}
                selectData={{ acceptType: acceptType, viewOption: false, viewButton: false, maxNumber: 1, multiple: false }}
            />
            {visible && (
                <>
                    <Stack spacing={3}>
                        <Stack direction='row' spacing={2}>
                            <TextField
                                select
                                fullWidth
                                size={'small'}
                                InputLabelProps={{ shrink: true }}
                                value={properties.backgroundPosition}
                                label='Position'
                                onChange={(event) => handleChange('backgroundPosition', event.target.value)}
                            >
                                <MenuItem
                                    sx={{
                                        mx: 1,
                                        my: 0.5,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                    }}
                                    value={'Сонгох'}
                                >
                                    Сонгох
                                </MenuItem>
                                {backgroundProperty?.position.map((option, index) => (
                                    <MenuItem
                                        key={index}
                                        value={option}
                                        sx={{
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                fullWidth
                                size={'small'}
                                InputLabelProps={{ shrink: true }}
                                value={properties.backgroundRepeat}
                                label='Repeat'
                                onChange={(event) => handleChange('backgroundRepeat', event.target.value)}
                            >
                                <MenuItem
                                    sx={{
                                        mx: 1,
                                        my: 0.5,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                    }}
                                    value={'Сонгох'}
                                >
                                    Сонгох
                                </MenuItem>
                                {backgroundProperty?.repeat.map((option, index) => (
                                    <MenuItem
                                        key={index}
                                        value={option}
                                        sx={{
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <TextField
                            select
                            fullWidth
                            size={'small'}
                            InputLabelProps={{ shrink: true }}
                            value={properties.backgroundSize}
                            label='Size'
                            onChange={(event) => handleChange('backgroundSize', event.target.value)}
                        >
                            <MenuItem
                                sx={{
                                    mx: 1,
                                    my: 0.5,
                                    borderRadius: 0.75,
                                    typography: 'body2',
                                    textTransform: 'capitalize',
                                }}
                                value={'Сонгох'}
                            >
                                Сонгох
                            </MenuItem>
                            {backgroundProperty?.size.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    value={option}
                                    sx={{
                                        mx: 1,
                                        my: 0.5,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            onClick={handleValues}
                            startIcon={<Iconify icon={'akar-icons:send'} />}
                            size='small'
                        >
                            {'Сонгох'}
                        </LoadingButton>
                    </Box>
                </>
            )}
        </>
    );
}
