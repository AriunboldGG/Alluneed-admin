import { useState } from 'react';
// mui
import { Stack, Box, MenuItem, TextField } from '@mui/material';
// default import
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import PropTypes from 'prop-types';
// sections
import FilesList from './filesList';
import NewFileUpload from './newFileUpload';

FileMedia.propTypes = {
    selectData: PropTypes.object,
    onFiles: PropTypes.func,
};

export default function FileMedia({ selectData = {}, onFiles }) {
    const [selected, setSelected] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const { postFetcher } = useSwrFetcher();
    let { select = false, selectButton = 'Сонгох' } = selectData;

    // swr
    const { data: categoryList, isLoading: categoryLoading } = useSWR(
        [
            '/api/get_reference',
            true,
            {
                refCode: 'ATTACH_CATEGORY_TYPE',
            },
        ],
        (args) => postFetcher(args),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );
    // functions
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    return (
        <Box>
            {select && (
                <>
                    <TextField
                        select
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={selected}
                        label='Зураг оруулах хэлбэр'
                        onChange={handleChange}
                    >
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
                            Шинээр зураг оруулах
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
                            Жагсаалт харах
                        </MenuItem>
                    </TextField>
                </>
            )}

            {selected === 0 ? (
                <Stack
                    direction={{ xs: 'column', sm: 'column' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent='space-between'
                    spacing={2}
                    sx={{ px: 3 }}
                >
                    <NewFileUpload
                        categoryList={categoryList}
                        categoryLoading={categoryLoading}
                        onFiles={onFiles}
                        onRefresh={() => handleRefresh()}
                        selectData={selectData}
                    />
                </Stack>
            ) : (
                <FilesList
                    categoryList={categoryList}
                    categoryLoading={categoryLoading}
                    onFiles={onFiles}
                    onRefresh={() => handleRefresh()}
                    selectButton={selectButton}
                />
            )}
        </Box>
    );
}
