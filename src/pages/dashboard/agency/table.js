///React
import { useState, useEffect } from 'react';
///Named
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
//Mui
import { Box, Button, Card, Container, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';
///Default
import Layout from 'src/layouts/dashboard';
///Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableRenderBody, TableSkeleton, useTable } from 'src/components/table';
import { labelDisplayedRows } from 'src/components/table/utils';
///Section
import { useAuthContext } from 'src/auth/useAuthContext';
import { AgencyActionDialog } from 'src/sections/agency/action';
import { AgencyTableRow } from 'src/sections/agency/table';
import { TABLE_HEAD } from 'src/sections/agency/utils/schema';
// Mock data
import { mockUserData } from 'src/utils/mockData';

AgencyTable.getLayout = function getLayout(page) {
    return <Layout headTitle='Агентууд'>{page}</Layout>;
};

export default function AgencyTable() {
    const {
        state: { user },
    } = useAuthContext();
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
    const [dialogActionType, setDialogActionType] = useState('');
    const [filterModel, setFilterModel] = useState({});
    const [row, setRow] = useState({});

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
                data: mockUserData.agencies,
                pagination: { total_elements: mockUserData.agencies.length }
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
            data: mockUserData.agencies,
            pagination: { total_elements: mockUserData.agencies.length }
        });
        setIsLoading(false);
    };

    //Function
    const handleUpdate = async (row) => {
        setRow(row);
        setDialogActionType('update');
    };

    const handleCreate = async () => {
        setRow({});
        setDialogActionType('create');
    };

    const filterFunction = (data) => {
        setFilterModel(data);
    };

    return (
        <>
            <Container maxWidth={'xl'}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent='space-between'
                    spacing={2}
                    sx={{ mb: 5 }}
                >
                    <Typography variant='h4'>{'Агентуудын жагсаалт'}</Typography>
                    <Button variant='contained' startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={() => handleCreate()}>
                        {'Бүртгэх'}
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ position: 'relative' }}>
                            <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD} />
                                <TableBody>
                                    {isLoading ? (
                                        <TableSkeleton number={5} />
                                    ) : (
                                        <TableRenderBody data={tableData?.data}>
                                            {tableData?.data?.map((row, index) => (
                                                <AgencyTableRow
                                                    key={index}
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

                    <Box sx={{ position: 'relative' }}>
                        {!isLoading && (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component='div'
                                count={tableData?.pagination?.total_elements || 0}
                                page={page}
                                onPageChange={onChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={onChangeRowsPerPage}
                                labelRowsPerPage={'Хуудсанд харуулах тоо' + ': '}
                                labelDisplayedRows={(to) => labelDisplayedRows(to, 'Нийт систем хэрэглэгч: ')}
                            />
                        )}
                    </Box>
                </Card>
            </Container>
            <AgencyActionDialog
                row={row}
                dialogActionType={dialogActionType}
                changeDialogStatus={(e) => {
                    setDialogActionType(e);
                }}
                refreshTable={() => tableMutate()}
            />
        </>
    );
}
