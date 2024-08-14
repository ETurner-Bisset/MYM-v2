import { IoInformationCircleOutline } from 'react-icons/io5';

import MainHeader from '@/components/MainHeader/MainHeader';

const AboutPage = () => {
  return (
    <main>
      <MainHeader
        title="About This App"
        icon={<IoInformationCircleOutline />}
      />
    </main>
  );
};

export default AboutPage;
