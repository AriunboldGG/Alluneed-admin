import { useState, useEffect } from 'react';
// @mui
import { TextField, Stack, MenuItem } from '@mui/material';
// default import
import PropTypes from 'prop-types';
// sections
import { FILE_SORT_OPTIONS } from '../utils/schema';
import { handleSort } from '../utils/func';

FileSortName.propTypes = {
    onFilterName: PropTypes.func,
};

export default function FileSortName({ onFilterName }) {
    const [sortCol, setSortCol] = useState('');
    const [sortType, setSortType] = useState('desc');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let filterData;
            filterData = handleSendData();
            onFilterName(filterData);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [sortCol, sortType]);

    // function
    const handleSendData = () => {
        try {
            let pickedFilter = '';
            if (sortCol !== '') {
                pickedFilter = `${handleSort(sortCol)} ${sortType}`;
            }
            return pickedFilter;
        } catch (e) {
            return;
        }
    };

    return (
        <Stack spacing={1} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} sx={{ width: 1 }}>
            <TextField
                size='small'
                fullWidth
                select
                label='Төрөл'
                InputLabelProps={{ shrink: true }}
                sx={{
                    maxWidth: 200,
                }}
                value={sortCol ? sortCol : 'Үүссэн огноо'}
                onChange={(event) => setSortCol(event.target.value)}
            >
                {FILE_SORT_OPTIONS?.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'unset',
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                size='small'
                fullWidth
                select
                label='Эрэмбэ'
                InputLabelProps={{ shrink: true }}
                sx={{
                    maxWidth: 200,
                }}
                value={sortType ? sortType : 'desc'}
                onChange={(event) => setSortType(event.target.value)}
            >
                <MenuItem
                    value={'desc'}
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'unset',
                    }}
                >
                    desc
                </MenuItem>
                <MenuItem
                    value={'asc'}
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'unset',
                    }}
                >
                    asc
                </MenuItem>
            </TextField>
        </Stack>
    );
}
