import { FaUser } from 'react-icons/fa';

import MainHeader from '@/components/MainHeader/MainHeader';
import ProfileForm from './ProfileForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import DeleteAccountForm from './DeleteAccountForm';
import classes from './ProfileContent.module.css';

const ProfileContent = ({ user }) => {
  return (
    <main>
      <MainHeader title="Profile" icon={<FaUser />} />
      <section
        className={user.googleId === '' ? classes.section : classes.sectionB}
      >
        <ProfileForm title={user.title} name={user.name} email={user.email} />
        {user.googleId === '' && <UpdatePasswordForm />}
        <DeleteAccountForm />
      </section>
    </main>
  );
};

export default ProfileContent;
