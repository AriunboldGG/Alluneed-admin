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
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
///Default
import PropTypes from 'prop-types';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
//Components
import { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
///Sections
import { styled } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import useAction from 'src/sections/user/hooks/useAction';
import useSWR from 'swr';

//Props
UserActionDialog.propTypes = {
    row: PropTypes.object.isRequired,
    dialogActionType: PropTypes.string,
    refreshTable: PropTypes.func,
    changeDialogStatus: PropTypes.func,
    orgList: PropTypes.array,
    adminList: PropTypes.array,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function UserActionDialog({
    role,
    reference,
    row,
    dialogActionType,
    refreshTable,
    changeDialogStatus,
    orgList,
    adminList,
    setSoum,
    soum,
    soumList,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [roleId, setroleId] = useState(null);
    const { formFetcher, postFetcher, putFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus, roleId || 1);

    useEffect(() => {
        setroleId(form?.values?.roleId ? form?.values?.roleId : 1);
    }, [form?.values?.roleId]);

    const { trigger, isMutating } = useSWRMutation(
        `/auth${form?.values?.roleId === 1 ? '/signup/admin' : form?.values?.roleId === 2 ? '/signup/influencer' : '/signup/company'}`,
        formFetcher,
        {
            onSuccess: (newData) => {
                newData?.response_code === 200
                    ? (enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн'),
                      form.reset(),
                      actionFunction.handleClose(),
                      refreshTable())
                    : enqueueSnackbar(newData?.response_msg || 'Алдаа гарлаа, дахин оролдоно уу', {
                          variant: 'warning',
                      });
            },
            onError: (err) => {
                err &&
                    enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                        variant: 'warning',
                    });
            },
        }
    );

    const { trigger: putTrigger, isMutating: putMutating } = useSWRMutation(`/users/${row?.id}`, formFetcher, {
        onSuccess: (newData) => {
            newData?.response_code === 200
                ? (enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн'),
                  form.reset(),
                  actionFunction.handleClose(),
                  refreshTable())
                : enqueueSnackbar(newData?.response_msg || 'Алдаа гарлаа, дахин оролдоно уу', {
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

    //Function
    const onSubmit = async () => {
        if (form?.values?.roleId === 1) {
            var body = {
                email: form?.values?.email,
                name: form?.values?.name,
                password: form?.values?.password,
                passwordConfirm: form?.values?.confirmPassword,
                photo: typeof form?.values?.image === 'string' ? null : form?.values?.image,
            };
            if (dialogActionType === 'update') {
                body = { ...body, id: row?.id };
            }
        } else if (form?.values?.roleId === 2) {
            var body = {
                email: form?.values?.email,
                password: form?.values?.password,
                passwordConfirm: form?.values?.confirmPassword,
                phone_number: form?.values?.phoneNumber,
                audience_interests: form?.values?.audienceInterests,
                average_likes: Number(form?.values?.averageLikes),
                average_comments: form?.values?.averageComments,
                avg_reel_plays: Number(form?.values?.avgReelPlays),
                avg_views: Number(form?.values?.avgViews),
                bio: form?.values?.bio,
                engagement_rate: Number(form?.values?.engagementRate),
                followers: Number(form?.values?.followers),
                gender_split: form?.values?.genderSplit,
                ig_name: form?.values?.igName,
                location: form?.values?.location,
                popular_posts: form?.values?.popularPosts,
                total_posts: Number(form?.values?.totalPosts),
                photo: typeof form?.values?.image === 'string' ? null : form?.values?.image,
                role_id: String(form?.values?.roleId),
                name: form?.values?.name,
            };
            if (dialogActionType === 'update') {
                body = { ...body, id: row?.id };
            }
        } else if (form?.values?.roleId === 3) {
            var body = {
                email: form?.values?.email,
                password: form?.values?.password,
                passwordConfirm: form?.values?.confirmPassword,
                phone_number: form?.values?.phoneNumber,
                manager_phone_number: form?.values?.manager_phone_number,
                company_account: form?.values?.company_account,
                location: form?.values?.location,
                role_id: String(form?.values?.roleId),
                name: form?.values?.name,
                prole_id: String(form?.values?.prole),
                photo: typeof form?.values?.image === 'string' ? null : form?.values?.image,
            };
            if (dialogActionType === 'update') {
                body = { ...body, id: row?.id };
            }
        }
        dialogActionType === 'update' ? putTrigger({ body: body, method: 'put' }) : trigger({ body: body });
    };

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

    return (
        <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth='sm' fullWidth>
            <DialogTitle>{dialogActionType === 'update' ? 'Систем хэрэглэгч засах' : 'Систем хэрэглэгч нэмэх'}</DialogTitle>

            <DialogContent>
                <FormProvider methods={form.methods}>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        {actionState.dialogLoader ? (
                            <Stack justifyContent='center' alignItems='center' sx={{ height: 400 }}>
                                <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                            </Stack>
                        ) : (
                            <>
                                <RHFSelect
                                    disabled={dialogActionType === 'update'}
                                    fullWidth
                                    name='roleId'
                                    label='Хэрэглэгчийн эрх'
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                >
                                    {role?.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            value={option.id}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 0.75,
                                                typography: 'body2',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                                {[1, 2, 3]?.includes(form?.values?.roleId) && (
                                    <>
                                        <RHFUploadAvatar name='image' maxSize={3145728} onDrop={handleDrop} />
                                        <RHFTextField name='name' label='Нэр' fullWidth />
                                    </>
                                )}
                                {[2, 3]?.includes(form?.values?.roleId) && (
                                    <>
                                        <RHFTextField name='email' label='И-Мэйл' fullWidth />
                                        <RHFTextField name='phoneNumber' label='Утасны дугаар' fullWidth />
                                    </>
                                )}

                                {[3]?.includes(form?.values?.roleId) && (
                                    <>
                                        <RHFTextField name='manager_phone_number' label='Менежр утасны дугаар' fullWidth />

                                        <RHFTextField name='company_account' label='Компанийн дансны дугаар' fullWidth />
                                        <RHFTextField name='location' label='Хаяг' fullWidth />
                                        <RHFSelect
                                            fullWidth
                                            name='prole'
                                            label='Prole'
                                            InputLabelProps={{ shrink: true }}
                                            SelectProps={{
                                                native: false,
                                                sx: { textTransform: 'capitalize' },
                                            }}
                                        >
                                            {reference?.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option.ID}
                                                    sx={{
                                                        mx: 1,
                                                        my: 0.5,
                                                        borderRadius: 0.75,
                                                        typography: 'body2',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    {option?.name}
                                                </MenuItem>
                                            ))}
                                        </RHFSelect>
                                    </>
                                )}

                                {[2]?.includes(form?.values?.roleId) && (
                                    <>
                                        <RHFTextField name='audienceInterests' label='Үзэгчдийн сонирхол' fullWidth />
                                        <RHFTextField name='averageLikes' label='Дундаж лайк' fullWidth />
                                        <RHFTextField name='averageComments' label='Дундаж сэтгэгдэл' fullWidth />
                                        <RHFTextField name='avgReelPlays' label='Дундаж reel үзэлт' fullWidth />
                                        <RHFTextField name='avgViews' label='Дундаж хандалт' fullWidth />
                                        <RHFTextField name='bio' label='Bio' fullWidth />
                                        <RHFTextField name='engagementRate' label='engagement_rate' fullWidth />
                                        <RHFTextField name='followers' label='Дагагчидын тоо' fullWidth />
                                        <RHFTextField name='genderSplit' label='genderSplit' fullWidth />
                                        <RHFTextField name='igName' label='Инстаграм нэр' fullWidth />
                                        <RHFTextField name='location' label='Хаяг' fullWidth />
                                        <RHFTextField name='popularPosts' label='popularPosts' fullWidth />
                                        <RHFTextField name='totalPosts' label='Нийтлэлийн тоо' fullWidth />
                                    </>
                                )}

                                {[1, 2, 3]?.includes(form?.values?.roleId) && (
                                    <RHFTextField
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        label='Нууц үг'
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                {[1, 2, 3]?.includes(form?.values?.roleId) && (
                                    <RHFTextField type={showPassword ? 'text' : 'password'} name='confirmPassword' label='Нууц үг давтах' fullWidth />
                                )}
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
                    disabled={dialogActionType === 'create' && !form.formState.isValid}
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
