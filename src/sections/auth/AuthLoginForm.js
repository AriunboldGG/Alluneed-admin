//react
import { useState } from 'react';
//mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Box,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
//named import
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { PATH_AUTH } from 'src/routes/paths';
//default import
import * as Yup from 'yup';
import NextLink from 'next/link';
//components
import Iconify from 'src/components/iconify';
// Mock authentication
import { mockAuth } from 'src/utils/mockData';

export default function AuthLoginForm() {
  const {
    handlers: { signIn },
  } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Нэвтрэх нэрээ оруулна уу!'),
    password: Yup.string().required('Нууц үгээ оруулна уу!'),
  });

  const defaultValues = { email: '', password: '' };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await mockAuth.login(data?.email, data?.password);
      if (response?.token) {
        signIn(response?.token);
      } else {
        reset();
        setError('afterSubmit', { message: 'Login failed' });
      }
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || 'Алдаа гарлаа.Дахин оролдоно уу',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name='email' label='Нэвтрэх нэр' />
        <RHFTextField
          name='password'
          label='Нууц үг'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Box sx={{ my: 3 }}>
        <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Link
            component={NextLink}
            href={PATH_AUTH.forgotPassword}
            variant='subtitle2'
            sx={{ textDecoration: 'underline' }}
          >
            Нууц үг сэргээх
          </Link>
        </Stack>
      </Box>
      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'primary.main',
          color: (theme) =>
            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          '&:hover': {
            bgcolor: 'primary.dark',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          },
        }}
      >
        Нэвтрэх
      </LoadingButton>
    </FormProvider>
  );
}
