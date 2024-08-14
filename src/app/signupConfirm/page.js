import MainHeader from '@/components/MainHeader/MainHeader';
import classes from './page.module.css';

const SignupConfirmPage = () => {
  return (
    <main className={classes.main}>
      <MainHeader title="Successfully Signed Up!" />
      <p>
        An email has been sent to the address you provided with an activation
        link. Please check your inboxes and spam folders.
      </p>
    </main>
  );
};

export default SignupConfirmPage;
