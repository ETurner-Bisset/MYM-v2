import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import MainHeader from '@/components/MainHeader/MainHeader';
import Features from '@/components/Features/Features';
import AuthFormState from '@/components/authComponents/AuthFormState';
import classes from './page.module.css';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <main>
      <MainHeader
        title="Manage Your Meds"
        icon={<FaPrescriptionBottleMedical />}
      />
      <section className={session?.user ? classes.sectionB : classes.section}>
        <p>
          Welcome! Here you can set up reminders for when to take your
          medications and when to order your prescriptions.
        </p>
        <Features />
        <div className={classes['form-div']}>
          {!session && <AuthFormState />}
        </div>
      </section>
    </main>
  );
}
