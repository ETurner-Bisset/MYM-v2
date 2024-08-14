import MainHeader from '@/components/MainHeader/MainHeader';

const EmailSentPage = () => {
  return (
    <main>
      <MainHeader title="Password Reset Link Sent." />
      <p>
        A reset password link has been sent to your email address. Please check
        your inboxes and spam folders.
      </p>
    </main>
  );
};

export default EmailSentPage;
