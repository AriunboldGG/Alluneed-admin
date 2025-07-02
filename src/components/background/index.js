import { useState } from 'react';
// mui
import { Box, MenuItem, TextField } from '@mui/material';
// default import
import PropTypes from 'prop-types';
// sections
import BackgroundImage from './BackgroundImage';
import BackgroundColor from './BackgroundColor';

Background.propTypes = {
    onHandler: PropTypes.func,
};

export default function Background({ onHandler }) {
    const [selected, setSelected] = useState(0);

    // functions
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const onFiles = (event) => {
        onHandler(event);
    };

    return (
        <Box>
            <TextField select fullWidth InputLabelProps={{ shrink: true }} value={selected} label='Төрөл сонгоно уу' onChange={handleChange}>
                <MenuItem
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                    value={0}
                >
                    Сонгох
                </MenuItem>
                <MenuItem
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                    value={1}
                >
                    Зураг оруулах
                </MenuItem>
                <MenuItem
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                    value={2}
                >
                    Өнгө сонгох
                </MenuItem>
            </TextField>
            {selected === 1 ? <BackgroundImage onFiles={onFiles} /> : selected === 2 && <BackgroundColor onFiles={onFiles} />}
        </Box>
    );
}
