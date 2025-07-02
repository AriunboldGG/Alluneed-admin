import { useState } from 'react';
// @mui
import { Button, Stack, Typography } from '@mui/material';
// named import
import { useSnackbar } from 'notistack';
// default import
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import PropTypes from 'prop-types';
// components
import { useTable } from 'src/components/table';
// sections
import { FileFilterName, FileSortName } from './filter';
import FileListView from './FileListView';

FilesList.propTypes = {
    categoryList: PropTypes.array,
    categoryLoading: PropTypes.bool,
    onFiles: PropTypes.func,
    onRefresh: PropTypes.func,
    selectButton: PropTypes.string,
};

export default function FilesList({ categoryList = [], categoryLoading = false, onFiles, onRefresh, selectButton }) {
    const [filterModel, setFilterModel] = useState([]);
    const [sortModel, setSortModel] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { enqueueSnackbar } = useSnackbar();
    const { postFetcher } = useSwrFetcher();
    const { selected, onSelectRow } = useTable();

    // swr
    const {
        data: newData,
        isLoading,
        error,
    } = useSWR(
        [
            '/web-admin/api/v1/attachment/list',
            true,
            {
                page_no: 1, // backend нь go дээр учраас page 1ээс эхэлж тоологдоно гэсэн.
                per_page: rowsPerPage,
                sort: sortModel !== '' ? sortModel : 'created_at desc',
                filter: filterModel,
            },
        ],
        (args) => postFetcher(args),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );
    error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

    // functions
    const handleFilterName = (event) => {
        setFilterModel(event);
    };

    const handleSortName = (event) => {
        setSortModel(event);
    };

    const handleFile = () => {
        try {
            let array = [];
            array = selected.length > 0 && selected.map((file) => file.file_url);
            onFiles(array);
            onRefresh();
        } catch (e) {
            return;
        }
    };

    return (
        <>
            <Stack sx={{ display: 'flex', gap: 2, my: 2 }}>
                <Typography variant='subtitle1'>Филтер</Typography>

                {!categoryLoading && <FileFilterName onFilterName={handleFilterName} categoryList={categoryList} />}
            </Stack>
            <Stack sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Typography variant='subtitle1'>Эрэмбэлэх</Typography>
                <FileSortName onFilterName={handleSortName} />
            </Stack>

            <FileListView tableData={newData} isLoading={isLoading} onSelectRow={onSelectRow} />
            {newData?.pagination?.total_elements > rowsPerPage && (
                <Stack sx={{ width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Button onClick={() => setRowsPerPage(rowsPerPage + 10)}>Цааш үзэх</Button>
                    {selected?.length > 0 && (
                        <Button variant='outlined' onClick={() => handleFile()}>
                            {selectButton}
                        </Button>
                    )}
                </Stack>
            )}
        </>
    );
}
