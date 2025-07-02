///Named
import { LoadingButton } from '@mui/lab';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
///Default
import PropTypes from 'prop-types';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
//Components
import { RHFSelect, RHFTextField, RHFUpload, RHFUploadAvatar, RHFUploadBox } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
///Sections
import { styled } from '@mui/system';
import { useCallback, useState } from 'react';
import useAction from 'src/sections/campaigns/hooks/useAction';

//Props
CampaignsActionDialog.propTypes = {
    row: PropTypes.object.isRequired,
    dialogActionType: PropTypes.string,
    refreshTable: PropTypes.func,
    changeDialogStatus: PropTypes.func,
};

export default function CampaignsActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus }) {
    const { formFetcher, postFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus);

    const { trigger, isMutating } = useSWRMutation(`/company`, formFetcher, {
        onSuccess: (newData) => {
            newData?.response_code === 200
                ? (enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн'),
                  form.reset(),
                  actionFunction.handleClose(),
                  refreshTable())
                : enqueueSnackbar(newData?.message || 'Алдаа гарлаа, дахин оролдоно уу', {
                      variant: 'warning',
                  });
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
        },
    });

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            const reader = new FileReader();
            reader.onload = function () {
                form.setValue(
                    'image',
                    {
                        base64: reader.result.replace('data:', '').replace(/^.+,/, ''),
                        preview: newFile.preview,
                    },
                    { shouldValidate: true }
                );
            };
            reader.readAsDataURL(file);
        },
        [form.setValue]
    );

    //Function
    const onSubmit = async () => {
        let body = {
            id: row?.id,
            name: form?.values?.name,
            email: form?.values?.email,
            phone: form?.values?.phone,
            city: form?.values?.city,
            address: form?.values?.address,
            areas_of_activity: form?.values?.areas_of_activity,
            image: typeof form?.values?.image === 'string' ? null : form?.values?.image,
            website: form?.values?.website,
            description: form?.values?.description,
        };
        trigger({ body, ...(dialogActionType === 'update' && { method: 'put' }) });
    };

    return (
        <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth='sm' fullWidth>
            <DialogTitle>{dialogActionType === 'update' ? 'Байгууллага засах' : 'Байгууллага бүртгэх'}</DialogTitle>
            <DialogContent>
                <FormProvider methods={form.methods}>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        {actionState.dialogLoader ? (
                            <Stack justifyContent='center' alignItems='center' sx={{ height: 400 }}>
                                <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                            </Stack>
                        ) : (
                            <>
                                <RHFTextField name='name' label='Нэр' fullWidth />
                                <RHFTextField name='email' label='И-мэйл' fullWidth />
                                <RHFTextField name='phone' label='Утас' fullWidth />
                                <RHFTextField name='city' label='Хот' fullWidth />
                                <RHFTextField name='youtube_link' label='Youtube Link' fullWidth />
                                <RHFTextField name='address' label='Хаяг' fullWidth />
                                <RHFTextField name='areas_of_activity' label='Үйл ажиллагааны чиглэл' fullWidth />
                                <RHFTextField name='description' label='Тайлбар' fullWidth />
                                <RHFTextField name='website' label='Website' fullWidth />
                                <RHFUpload name='image' maxSize={3145728} onDrop={handleDrop} thumbnail />
                            </>
                        )}
                    </Stack>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => actionFunction.handleClose()}
                    color='inherit'
                    size='medium'
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
                >
                    {'Хаах'}
                </Button>
                <LoadingButton
                    disabed={dialogActionType === 'create' && !form.formState.isValid}
                    type='submit'
                    variant='contained'
                    loading={isMutating}
                    onClick={form.handleSubmit(onSubmit)}
                    startIcon={<Iconify icon={dialogActionType === 'update' ? 'akar-icons:edit' : 'akar-icons:send'} />}
                    size='small'
                >
                    {dialogActionType === 'update' ? 'Засах' : 'Нэмэх'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
