///React
import { useEffect, useState } from 'react';
//Mui
import { Button, MenuItem, Stack, TextField } from '@mui/material';
///Default
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';

// props
UserTableToolbar.propTypes = {
    filterFunction: PropTypes.func,
    adminList: PropTypes.array,
};

export default function UserTableToolbar({ filterFunction, adminList }) {
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
                enqueueSnackbar(`${size}-с их тэмдэгт оруулж болохгүй`, { variant: 'warning' });
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
                value={filterModel?.organization ? filterModel?.organization : ''}
                onChange={(event) => isValid(100, event.target.value, 'organization')}
            />

            <TextField
                fullWidth
                label='Ажилтнаар хайх'
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.username ? filterModel?.username : ''}
                onChange={(event) => handlingFilterChange('username', event.target.value)}
            />

            <TextField
                fullWidth
                select
                label='Хэрэглэгчийн эрхээр хайх'
                InputLabelProps={{ shrink: true }}
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.authType ? filterModel?.authType : 0}
                onChange={(event) => handlingFilterChange('authType', event.target.value)}
            >
                <MenuItem
                    value={'0'}
                    sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                >
                    {'Бүгд'}
                </MenuItem>
                {adminList &&
                    adminList?.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option?.id}
                            sx={{
                                mx: 1,
                                my: 0.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                textTransform: 'capitalize',
                            }}
                        >
                            {option?.name}
                        </MenuItem>
                    ))}
            </TextField>

            <TextField
                fullWidth
                label='Мэйл хаягаар хайх'
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.email ? filterModel?.email : ''}
                onChange={(event) => isValid(100, event.target.value, 'email')}
            />

            <TextField
                fullWidth
                label='Утасны дугаараар хайх'
                sx={{
                    maxWidth: 240,
                }}
                value={filterModel?.phoneNumber ? filterModel?.phoneNumber : ''}
                onChange={(event) => isValid(8, event.target.value, 'phoneNumber')}
            />
            {Object.keys(filterModel).length > 0 && (
                <Button color='error' sx={{ flexShrink: 0 }} onClick={() => setFilterModel({})} startIcon={<Iconify icon='eva:trash-2-outline' />}>
                    Цэвэрлэх
                </Button>
            )}
        </Stack>
    );
}
