import Head from 'next/head';
import ForgotPasswordView from 'src/sections/auth/forgot-password-view';
import GuestGuard from 'src/auth/GuestGuard';
import CompactLayout from 'src/layouts/compact/CompactLayout';

export default function ForgotPasswordPage() {
   return (
      <>
         <Head>
            <title> Нууц үг сэргээх | Bpay</title>
         </Head>

         <GuestGuard>
            <CompactLayout>
               <ForgotPasswordView />
            </CompactLayout>
         </GuestGuard>
      </>
   );
}
