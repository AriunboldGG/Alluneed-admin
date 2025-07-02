import { useState } from 'react';
// mui
import { Stack, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// default import
import PropTypes from 'prop-types';
// components
import Iconify from 'src/components/iconify';
// section

BackgroundColor.propTypes = {
    onFiles: PropTypes.func,
};

export default function BackgroundColor({ onFiles }) {
    const [colorData, setColorData] = useState({
        type: 'color',
        color: '',
    });
    const [errorView, setErrorView] = useState(false);

    // functions
    const onSubmit = async () => {
        try {
            if (colorData.color === '') {
                setErrorView(true);
            } else {
                onFiles(colorData);
                setErrorView(false);
            }
        } catch (e) {
            return;
        }
    };

    const handleChange = (event) => {
        setColorData({ ...colorData, color: event.target.value });
    };

    return (
        <>
            <Stack spacing={2} sx={{ mt: 3 }} direction={'row'}>
                <TextField type='color' size={'small'} value={colorData.color || '#000000'} onChange={handleChange} sx={{ width: 70, m: 0, p: 0 }} />
                <TextField
                    fullWidth
                    size={'small'}
                    InputLabelProps={{ shrink: true }}
                    value={colorData.color}
                    placeholder='Өнгө сонгох'
                    onChange={handleChange}
                    error={errorView}
                    helperText={errorView ? 'Заавал бөглөнө үү' : ' '}
                />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                <LoadingButton type='submit' variant='contained' onClick={onSubmit} startIcon={<Iconify icon={'akar-icons:send'} />} size='small'>
                    {'Сонгох'}
                </LoadingButton>
            </Box>
        </>
    );
}
