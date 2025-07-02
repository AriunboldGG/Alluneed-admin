// react
import React, { useState, useEffect } from 'react';
// mui
import { Box, Card, Table, TableBody, Container, TableContainer, TablePagination, Typography, Button, Stack } from '@mui/material';
// named import
import { useSnackbar } from 'notistack';
// default import
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
// components
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { TableHeadCustom, TableSkeleton, useTable, TableRenderBody } from 'src/components/table';
// section
import { SettingsTableRow } from 'src/sections/reference/table';
import { SettingsActionDialog } from 'src/sections/reference/action';
import { TABLE_HEAD_SETTINGS } from 'src/sections/reference/utils/schema';
// Mock data
import { mockUserData } from 'src/utils/mockData';

SettingsListTable.getLayout = function getLayout(page) {
    return <DashboardLayout headTitle="Role Тохиргоо">{page}</DashboardLayout>;
};

export default function SettingsListTable() {
    const { enqueueSnackbar } = useSnackbar();
    const [dialogActionType, setDialogActionType] = useState('');
    const [row, setRow] = useState({});
    const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

    // Mock data state
    const [tableData, setTableData] = useState({
        data: [],
        pagination: { total_elements: 0 }
    });
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading and data fetching
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set mock data
            setTableData({
                data: mockUserData.roles,
                pagination: { total_elements: mockUserData.roles.length }
            });

            setIsLoading(false);
        };

        loadData();
    }, []);

    // Mock refresh function
    const tableMutate = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setTableData({
            data: mockUserData.roles,
            pagination: { total_elements: mockUserData.roles.length }
        });
        setIsLoading(false);
    };

    // functions
    const labelDisplayedRows = ({ to, count }) => {
        return (
            <span>
                {'Нийт арга хэмжээ' + ': '}
                <span>{count !== -1 ? count : `${to}-аас илүү`}</span>
            </span>
        );
    };

    const handleUpdate = async (row) => {
        setRow(row);
        setDialogActionType('update');
    };

    const handleCreate = () => {
        setRow({});
        setDialogActionType('create');
    };

    return (
        <>
            <Container maxWidth={'xl'}>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 4 }}>
                    <Typography variant="h4">Role тохиргоо</Typography>
                    <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={() => handleCreate()}>
                        Нэмэх
                    </Button>
                </Stack>
                <Card>
                    <Scrollbar>
                        <TableContainer>
                            <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD_SETTINGS} />
                                <TableBody>
                                    {isLoading ? (
                                        <TableSkeleton number={5} />
                                    ) : (
                                        <TableRenderBody data={tableData?.data}>
                                            {tableData?.data?.map((row, index) => (
                                                <SettingsTableRow
                                                    key={row?.id}
                                                    index={index}
                                                    row={row}
                                                    page={page}
                                                    rowsPerPage={rowsPerPage}
                                                    handleUpdate={() => handleUpdate(row)}
                                                    refreshTable={() => tableMutate()}
                                                />
                                            ))}
                                        </TableRenderBody>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    {!isLoading && (
                        <Box sx={{ position: 'relative' }}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tableData?.pagination?.total_elements || 0}
                                page={page}
                                onPageChange={onChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={onChangeRowsPerPage}
                                labelRowsPerPage={'Хуудсанд харуулах тоо' + ': '}
                                labelDisplayedRows={(to, count) => labelDisplayedRows(to, count)}
                            />
                        </Box>
                    )}
                </Card>
            </Container>
            {!isLoading && (
                <SettingsActionDialog
                    row={row}
                    dialogActionType={dialogActionType}
                    refreshTable={() => tableMutate()}
                    changeDialogStatus={(e) => {
                        setDialogActionType(e);
                    }}
                />
            )}
        </>
    );
}
