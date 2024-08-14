import MainHeader from '@/components/MainHeader/MainHeader';
import ForgotPasswordForm from '@/components/AuthComponents/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <main>
      <MainHeader title="Forgotten Your Password?" />
      <p>A reset password link will be sent to your email address.</p>
      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPasswordPage;
