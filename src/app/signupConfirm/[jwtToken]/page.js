import MainHeader from '@/components/MainHeader/MainHeader';
import ActivateAccountForm from '@/components/authComponents/ActivateAccountForm';

const AccountActivatedPage = () => {
  return (
    <main>
      <MainHeader title="Click to Activate Your Account" />
      <ActivateAccountForm />
    </main>
  );
};

export default AccountActivatedPage;
