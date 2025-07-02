// React
import { useState, useEffect } from 'react';
// Mui
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// Named
import { useSnackbar } from 'notistack';
// Default
import Layout from 'src/layouts/dashboard';
// Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  TableHeadCustom,
  TableRenderBody,
  TableSkeleton,
  useTable,
} from 'src/components/table';
import { labelDisplayedRows } from 'src/components/table/utils';
// Sections
import { UserActionDialog } from 'src/sections/user/action';
import { UserTableRow, UserTableToolbar } from 'src/sections/user/table';
import { TABLE_HEAD } from 'src/sections/user/utils/schema';
// Mock data
import { mockUserData } from 'src/utils/mockData';

UserListTable.getLayout = function getLayout(page) {
  return <Layout headTitle='Систем хэрэглэгчид'>{page}</Layout>;
};

export default function UserListTable() {
  const [dialogActionType, setDialogActionType] = useState('');
  const [filterModel, setFilterModel] = useState({});
  const [row, setRow] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  // Mock data state
  const [tableData, setTableData] = useState({
    data: [],
    pagination: { total_elements: 0 }
  });
  const [roleData, setRoleData] = useState({ data: [] });
  const [tableDataRef, setTableDataRef] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [roleDataLoading, setRoleDataLoading] = useState(true);
  const [isLoadingRef, setIsLoadingRef] = useState(true);

  // Simulate loading and data fetching
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setRoleDataLoading(true);
      setIsLoadingRef(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set mock data
      setTableData({
        data: mockUserData.users,
        pagination: { total_elements: mockUserData.users.length }
      });
      setRoleData({ data: mockUserData.roles });
      setTableDataRef({ data: mockUserData.references });

      setIsLoading(false);
      setRoleDataLoading(false);
      setIsLoadingRef(false);
    };

    loadData();
  }, []);

  // Mock refresh function
  const tableMutate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setTableData({
      data: mockUserData.users,
      pagination: { total_elements: mockUserData.users.length }
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
  
  const handleView = async (row) => {
    setRow(row);
    setDialogActionType('view');
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
          <Typography variant='h4' sx>
            {'Систем хэрэглэгчдийн жагсаалт'}
          </Typography>
          <Button
            variant='contained'
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => handleCreate()}
          >
            {'Нэмэх'}
          </Button>
        </Stack>

        {/* {!isLoading && <UserTableToolbar adminList={adminList} filterFunction={filterFunction} />} */}
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1500, position: 'relative' }}>
              <Table>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                <TableBody>
                  {isLoading ? (
                    <TableSkeleton number={5} />
                  ) : (
                    <TableRenderBody data={tableData?.data}>
                      {tableData?.data?.map((row, index) => (
                        <UserTableRow
                          key={index}
                          index={index}
                          row={row}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          handleUpdate={() => handleUpdate(row)}
                          refreshTable={() => tableMutate()}
                          handleView={() => handleView(row)}
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
                labelDisplayedRows={(to) =>
                  labelDisplayedRows(to, 'Нийт систем хэрэглэгч: ')
                }
              />
            )}
          </Box>
        </Card>
      </Container>
      {!roleDataLoading && !isLoadingRef && (
        <UserActionDialog
          role={roleData?.data}
          reference={tableDataRef?.data}
          row={row}
          dialogActionType={dialogActionType}
          changeDialogStatus={(e) => {
            setDialogActionType(e);
          }}
          refreshTable={() => tableMutate()}
        />
      )}
    </>
  );
}
