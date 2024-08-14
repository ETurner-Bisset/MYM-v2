import { FaQuestion } from 'react-icons/fa';

import MainHeader from '@/components/MainHeader/MainHeader';

const MedicationNotFound = () => {
  return (
    <main>
      <MainHeader title="Not Found" icon={<FaQuestion />} />
      <p>Sorry, we could not find the requested medication.</p>
    </main>
  );
};

export default MedicationNotFound;
