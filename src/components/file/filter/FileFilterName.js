// react
import { useState, useEffect } from 'react';
// @mui
import { TextField, InputAdornment, Stack, Button, MenuItem } from '@mui/material';
// default import
import PropTypes from 'prop-types';
// components
import Iconify from 'src/components/iconify';
// sections
import FileFilterType from './FileFilterType';
import { FILE_TYPE_OPTIONS } from '../utils/schema';
import { fileTypeName, NumberToString } from '../utils/func';

FileSortName.propTypes = {
    onFilterName: PropTypes.func,
    categoryList: PropTypes.array,
    location: PropTypes.bool,
};

export default function FileSortName({ onFilterName, categoryList = [], location = false }) {
    const [filterModel, setFilterModel] = useState({});
    const [filterType, setFilterType] = useState([]);
    const [fileType, setFileType] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let filterData;
            filterData = handleSendData();
            onFilterName(filterData);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [filterModel, filterType]);

    // functions
    const handlingFilterChange = (name, value) => {
        try {
            value === '' ? setIsFiltered(false) : setIsFiltered(true);
            setFilterModel({ [name]: value });
        } catch (e) {
            return;
        }
    };

    const handleSendData = () => {
        try {
            let pickedFilter = [];
            if (Object.keys(filterModel).length > 0) {
                Object.keys(filterModel)[0] === 'title'
                    ? pickedFilter.push({
                          field_name: 'title',
                          value: Object.values(filterModel)[0],
                          operation: 'like',
                          field_type: 'string',
                      })
                    : Object.values(filterModel)[0] !== '1' &&
                      pickedFilter.push({
                          field_name: 'category_id',
                          value: Object.values(filterModel)[0].toString(),
                          operation: 'in',
                          field_type: 'number',
                      });
            }
            if (fileType.length > 0) {
                pickedFilter.push({
                    field_name: 'file_type_id',
                    value: NumberToString(fileType),
                    operation: 'in',
                    field_type: 'number',
                });
            }
            return pickedFilter;
        } catch (e) {
            return;
        }
    };

    const handleFilterType = (type) => {
        try {
            let file = fileTypeName(type);
            const checked = filterType.includes(type) ? filterType.filter((value) => value !== type) : [...filterType, type];
            const fileIds = fileType.includes(file) ? fileType.filter((value) => value !== file) : [...fileType, file];
            setFilterType(checked);
            setFileType(fileIds);
            checked.length > 0 ? setIsFiltered(true) : setIsFiltered(false);
        } catch (e) {
            return;
        }
    };

    const handleClearAll = () => {
        setFilterType([]);
        setFileType([]);
        setFilterModel({});
        setIsFiltered(false);
    };
    return (
        <Stack spacing={1} direction={{ xs: 'column', md: 'column', lg: location ? 'row' : 'column' }}>
            <Stack spacing={1} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} sx={{ width: 1 }}>
                <TextField
                    size='small'
                    placeholder='Хайх...'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                    value={filterModel?.title ? filterModel?.title : ''}
                    onChange={(event) => handlingFilterChange('title', event.target.value)}
                />
                <TextField
                    size='small'
                    select
                    label='Категориор хайх'
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        maxWidth: 1,
                        minWidth: 140,
                    }}
                    value={filterModel?.categoryId ? filterModel?.categoryId : '1'}
                    onChange={(event) => handlingFilterChange('categoryId', event.target.value)}
                >
                    <MenuItem
                        value={'1'}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'unset',
                        }}
                    >
                        Сонгох
                    </MenuItem>
                    {categoryList?.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option.id}
                            sx={{
                                mx: 1,
                                my: 0.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                textTransform: 'unset',
                            }}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <FileFilterType
                    filterType={filterType}
                    onFilterType={handleFilterType}
                    optionsType={FILE_TYPE_OPTIONS}
                    onReset={() => {
                        setFilterType([]);
                        setFileType([]);
                        setIsFiltered(false);
                    }}
                />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                {isFiltered && (
                    <Button variant='soft' color='error' onClick={handleClearAll} startIcon={<Iconify icon='eva:trash-2-outline' />}>
                        Цэвэрлэх
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
