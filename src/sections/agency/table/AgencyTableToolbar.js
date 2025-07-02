///React
import { useEffect, useState } from 'react';
//Mui
import { Button, Stack, TextField } from '@mui/material';
///Default
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';

// props
AgencyTableToolbar.propTypes = {
    filterFunction: PropTypes.func,
};

export default function AgencyTableToolbar({ filterFunction }) {
    const [filterModel, setFilterModel] = useState({});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filterModel) {
                filterFunction(filterModel);
            }
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [filterModel]);

    const handlingFilterChange = (name, value) => {
        setFilterModel({ ...filterModel, [name]: value });
    };

    const isValid = (size, value, type) => {
        if (value) {
            if (value?.length <= size) {
                handlingFilterChange(type, value);
            } else {
                enqueueSnackbar(`${size}-с их тэмдэгт оруулж болохгүй`, {
                    variant: 'warning',
                });
            }
        } else {
            handlingFilterChange(type, '');
        }
    };

    return (
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3, mb: 3 }}>
            <TextField
                fullWidth
                label='Байгууллагын нэрээр хайх'
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.name ? filterModel?.name : ''}
                onChange={(event) => isValid(150, event.target.value, 'name')}
            />
            <TextField
                fullWidth
                label='Байгууллагын РД хайх'
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.rd ? filterModel?.rd : ''}
                onChange={(event) => isValid(7, event.target.value, 'rd')}
            />
            {Object.keys(filterModel).length > 0 && (
                <Button color='error' sx={{ flexShrink: 0 }} onClick={() => setFilterModel({})} startIcon={<Iconify icon='eva:trash-2-outline' />}>
                    Цэвэрлэх
                </Button>
            )}
        </Stack>
    );
}
