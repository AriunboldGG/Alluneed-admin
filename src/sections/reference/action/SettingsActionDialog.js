// mui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// named import
import { useSnackbar } from 'notistack';
// default import
import useSWRMutation from 'swr/mutation';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import PropTypes from 'prop-types';
import useActionSettings from 'src/sections/reference/hooks/useActionSettings';
// components
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';

SettingsActionDialog.propTypes = {
    row: PropTypes.any,
    dialogActionType: PropTypes.string,
    refreshTable: PropTypes.func,
    changeDialogStatus: PropTypes.func,
};

export default function SettingsActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus }) {
    const { formFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { form, actionState, actionFunction } = useActionSettings(dialogActionType, row, changeDialogStatus);

    // swr
    const { trigger, isMutating } = useSWRMutation(`/reference${dialogActionType === 'update' ? `/${row?.ID}` : ''}`, formFetcher, {
        onSuccess: (newData) => {
            newData?.success && enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн');
            form.reset();
            actionFunction.handleClose();
            refreshTable();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
        },
    });

    // functions
    const onSubmit = async () => {
        let hasError = false;
        let body = {
            description: form?.values?.description,
            name: form?.values?.name,
            field1: form?.values?.field1,
            field2: form?.values?.field2,
            field3: form?.values?.field3,
            code: form?.values?.code,
        };

        if (dialogActionType === 'update') {
            body.id = row?.id;
        }

        if (!hasError) {
            trigger({ body, ...(dialogActionType === 'update' && { method: 'put' }) });
        }
    };

    return (
        <>
            <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth="sm" fullWidth>
                <DialogTitle>{dialogActionType === 'update' ? 'Утга засах' : 'Утга нэмэх'}</DialogTitle>
                <DialogContent>
                    <FormProvider methods={form.methods}>
                        <Stack spacing={3} sx={{ mt: 3 }}>
                            {actionState.dialogLoader ? (
                                <Stack justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                                    <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                                </Stack>
                            ) : (
                                <>
                                    <RHFTextField name="name" label="Нэр" fullWidth />
                                    <RHFTextField name="code" label="code" fullWidth />
                                    <RHFTextField name="description" label="Тайлбар" fullWidth />
                                    <RHFTextField name="field1" label="Field1" fullWidth />
                                    <RHFTextField name="field2" label="Field2" fullWidth />
                                    <RHFTextField name="field3" label="Field3" fullWidth />
                                </>
                            )}
                        </Stack>
                    </FormProvider>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => actionFunction.handleClose()}
                        color="inherit"
                        size="medium"
                        startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
                    >
                        {'Хаах'}
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isMutating}
                        onClick={form.handleSubmit(onSubmit)}
                        startIcon={<Iconify icon={dialogActionType === 'update' ? 'akar-icons:edit' : 'akar-icons:send'} />}
                        size="small"
                    >
                        {dialogActionType === 'update' ? 'Засах' : 'Нэмэх'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
