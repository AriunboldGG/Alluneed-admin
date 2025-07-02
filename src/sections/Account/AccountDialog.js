///Named
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  MenuItem,
  CircularProgress,
  Tab,
  Typography,
} from '@mui/material';
///Default
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
//Components
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
///Sections

import { useAuthContext } from 'src/auth/useAuthContext';
import { useState } from 'react';
import { fDate } from 'src/utils/formatTime';
import useActionAccount from './useAction';

//Props
AccountDialog.propTypes = {
  dialogActionType: PropTypes.string,
  refreshTable: PropTypes.func,
  changeDialchangeDialogStatusogStatus: PropTypes.func,
};

export default function AccountDialog({
  dialogActionType,
  changeDialogStatus,
}) {
  const { formFetcher } = useSwrFetcher();
  const [value, setValue] = useState('1');
  const {
    state: { user },
  } = useAuthContext();
  const [stop, setStop] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { form, actionState, actionFunction } = useActionAccount(
    dialogActionType,
    user,
    changeDialogStatus
  );

  //RoleList Request body
  const pagination = {
    page_no: 0,
    per_page: 1000,
    sort: 'created_at desc',
    filter: [],
  };

  const { trigger, isMutating } = useSWRMutation(
    value === '1'
      ? `/users/api/v1/user/edit`
      : `/users/api/v1/user/reset/password/token`,
    formFetcher,
    {
      onSuccess: (newData) => {
        newData?.responseCode === true
          ? (enqueueSnackbar(newData?.responseMsg, { variant: 'success' }),
            form.reset(),
            actionFunction.handleClose(),
            setStop(false))
          : enqueueSnackbar(newData?.responseMsg || 'Алдаа гарлаа', {
              variant: 'warning',
            });
      },

      onError: (err) => {
        err &&
          enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
            variant: 'warning',
          });
        actionFunction.handleClose();
      },
    }
  );

  //Function
  const onSubmit = async () => {
    let body = {
      firstname: form?.values?.firstname,
      lastname: form?.values?.lastname,
      username: form?.values.username,
      position: form?.values?.position,
      phoneNumber: form?.values?.phoneNumber,
      oldPassword: form?.values?.oldPassword,
      newPassword: form?.values?.newPassword,
      confirmPassword: form?.values?.confirmPassword,
    };

    trigger({ body });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    actionFunction.handleClose();
    setStop(false);
  };

  return (
    <Dialog
      open={actionState.dialogFormVisible}
      onClose={actionFunction.handleClose}
      sx={{ p: 3 }}
      maxWidth='md'
      fullWidth
    >
      <DialogContent sx={{ mt: 2 }}>
        <FormProvider methods={form.methods}>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              variant='fullWidth'
            >
              <Tab label='Хувийн мэдээлэл' value='1' />
              <Tab label='Нууц үг өөрчлөх' value='2' />
            </TabList>
            <TabPanel value='1'>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {actionState.dialogLoader ? (
                  <Stack
                    justifyContent='center'
                    alignItems='center'
                    sx={{ height: 400 }}
                  >
                    <CircularProgress
                      size={100}
                      thickness={1}
                      sx={{ padding: '5px' }}
                    />
                  </Stack>
                ) : (
                  <>
                    <Stack
                      flexDirection='row'
                      justifyContent='space-evenly'
                      width='100%'
                      marginTop={3}
                    >
                      <Stack spacing={3} width='40%'>
                        <RHFTextField
                          type='text'
                          name='lastname'
                          label='Овог'
                          fullWidth
                          disabled
                        />
                        <RHFTextField
                          type='text'
                          name='username'
                          label='И-мэил'
                          fullWidth
                          disabled={stop === false}
                        />
                        <RHFTextField
                          type='text'
                          name='position'
                          label='Албан тушаал'
                          fullWidth
                          disabled={stop === false}
                        />
                      </Stack>
                      <Stack spacing={3} width='40%'>
                        <RHFTextField
                          type='text'
                          name='firstname'
                          label='Нэр'
                          fullWidth
                          disabled
                        />
                        <RHFTextField
                          type='text'
                          name='phoneNumber'
                          label='Утасны дугаар'
                          fullWidth
                          disabled={stop === false}
                        />

                        <Stack spacing={1}>
                          {/* <Typography
                            sx={{ textDecoration: 'underline' }}
                            variant='body1'
                          >{`Бүртгэсэн огноо: ${fDate(
                            user.createdAt
                          )}`}</Typography> */}
                          {/* <Typography variant='body1'>{`Сүүлд холбогдсон огноо: ${fDate(
                            user.updatedAt
                          )}`}</Typography> */}
                        </Stack>
                      </Stack>
                    </Stack>
                  </>
                )}
              </Stack>
            </TabPanel>
            <TabPanel value='2'>
              <Stack spacing={3} width='80%' mx={6} marginTop={3}>
                <RHFTextField
                  type='text'
                  name='oldPassword'
                  label='Нууц үг'
                  fullWidth
                  disabled={stop === false}
                />
                <RHFTextField
                  type='text'
                  name='newPassword'
                  label='Шинэ нууц үг'
                  fullWidth
                  disabled={stop === false}
                />
                <RHFTextField
                  type='text'
                  name='confirmPassword'
                  label='Нууц үгээ дахин оруулна уу'
                  fullWidth
                  disabled={stop === false}
                />
              </Stack>
            </TabPanel>
          </TabContext>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          color='inherit'
          size='medium'
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          {'Буцах'}
        </Button>
        {stop === false && (
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isMutating}
            onClick={() => setStop(true)}
            startIcon={<Iconify icon={'akar-icons:edit'} />}
            size='small'
          >
            {'Засах'}
          </LoadingButton>
        )}
        {stop === true && (
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isMutating}
            onClick={form.handleSubmit(onSubmit)}
            startIcon={<Iconify icon={'akar-icons:edit'} />}
            size='small'
          >
            {'Хадгалах'}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
