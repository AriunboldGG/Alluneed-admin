import { Stack, Typography, Box } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';

import LoginLayout from 'src/layouts/login';
import AuthLoginForm from './AuthLoginForm';

export default function Login() {
    return (
        <LoginLayout>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative', textAlign: 'center' }}>
                <Typography variant="h4"> Alluneed админ системд тавтай морил</Typography>
            </Stack>

            <AuthLoginForm />
        </LoginLayout>
    );
}
