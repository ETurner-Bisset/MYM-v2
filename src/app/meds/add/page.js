import { MdOutlineAddBox } from 'react-icons/md';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/auth';
import MainHeader from '@/components/MainHeader/MainHeader';
import MedsForm from '@/components/Forms/MedsForm';

const AddMedication = async() => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  if (!session) {
    return redirect('/');
  }
  return (
    <main>
      <MainHeader title="Add Medication" icon={<MdOutlineAddBox />} />
      <MedsForm />
    </main>
  );
};
export default AddMedication;
