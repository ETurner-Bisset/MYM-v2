import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/auth';
import MainHeader from '@/components/MainHeader/MainHeader';
import NavLink from '@/components/NavLink';
import MedsGrid from '@/components/Meds/MedsGrid';
import SearchForm from '@/components/Forms/SearchForm';
import classes from './page.module.css';
import { getMedsByUserId } from '@/utils/getMedsByUserId';

const MedicationPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const meds = await getMedsByUserId(session.user.id);

  return (
    <main>
      <MainHeader title="Medications" icon={<FaPrescriptionBottleMedical />} />
      <div className={classes.container}>
        <div className={classes.options}>
          <p>
            To get started{' '}
            <NavLink href="/meds/add">Add New Medication</NavLink>
          </p>
          <SearchForm />
        </div>
        <div className={classes.meds}>
          {meds.length > 0 ? (
            <MedsGrid meds={meds} />
          ) : (
            <p>No medications found. Add a new medcation to get started.</p>
          )}
        </div>
      </div>
    </main>
  );
};
export default MedicationPage;
