import { useState } from 'react';
// @mui
import { Table, TableBody, Card, TableContainer, TableRow, TableCell, Stack, Typography, Checkbox } from '@mui/material';
// named import
import { HOST_API_KEY } from 'src/config-global';
// default import
import PropTypes from 'prop-types';
// components
import { TableSkeleton, TableRenderBody } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import FileThumbnail from 'src/components/file-thumbnail';
// sections
import FileFullSize from './FileFullSize';

// ----------------------------------------------------------------------

FileListView.propTypes = {
    tableData: PropTypes.object,
    isLoading: PropTypes.bool,
    onSelectRow: PropTypes.func,
};

export default function FileListView({ tableData = {}, isLoading = false, onSelectRow }) {
    const [confirmModal, setConfirmModal] = useState(false);
    const [dialogData, setDialogData] = useState({});
    // function
    const handleFullSize = (data, url) => {
        try {
            setDialogData({ title: data, file_url: url });
            setConfirmModal(true);
        } catch (e) {
            return;
        }
    };
    return (
        <>
            <Card>
                <Scrollbar>
                    <TableContainer
                        sx={{
                            position: 'relative',
                            maxHeight: 400,
                            overflow: 'scroll',
                        }}
                    >
                        <Table size={'small'}>
                            <TableBody>
                                {isLoading ? (
                                    <TableSkeleton number={5} />
                                ) : (
                                    <TableRenderBody data={tableData?.data}>
                                        {tableData?.data?.map((row, index) => (
                                            <TableRow
                                                sx={{
                                                    borderRadius: 1,
                                                    '& .MuiTableCell-root': {
                                                        bgcolor: 'background.default',
                                                    },
                                                }}
                                                key={index}
                                            >
                                                <TableCell
                                                    padding='checkbox'
                                                    sx={{
                                                        borderTopLeftRadius: 8,
                                                        borderBottomLeftRadius: 8,
                                                    }}
                                                >
                                                    <Checkbox onClick={() => onSelectRow(row)} />
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction='row' alignItems='center' spacing={2}>
                                                        <FileThumbnail
                                                            file={`${HOST_API_KEY}static-file/w-${32}${row?.file_url}`}
                                                            imageView
                                                            wSize={32}
                                                        />

                                                        <Typography
                                                            noWrap
                                                            variant='inherit'
                                                            sx={{ maxWidth: 360, cursor: 'pointer' }}
                                                            onClick={() => handleFullSize(row?.title, row?.file_url)}
                                                        >
                                                            {row.title}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableRenderBody>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
            <FileFullSize title={dialogData.title} open={confirmModal} onClose={() => setConfirmModal(false)} file_url={dialogData.file_url} />
        </>
    );
}
