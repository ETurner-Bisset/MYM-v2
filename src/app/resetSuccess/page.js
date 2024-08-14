import MainHeader from '@/components/MainHeader/MainHeader';
import NavLink from '@/components/NavLink';

const ResetSuccessPage = () => {
  return (
    <main>
      <MainHeader title="Password Successfully Reset." />
      <p>
        Your password has been successfully reset. Please{' '}
        <NavLink href="/">Login</NavLink> here.
      </p>
    </main>
  );
};

export default ResetSuccessPage;
