import { IoMdArrowRoundBack } from 'react-icons/io';
import { notFound } from 'next/navigation';

import MainHeader from '@/components/MainHeader/MainHeader';
import NavLink from '@/components/NavLink';
import MedDetailContent from '@/components/Meds/MedDetailContent';
import { getMedBySlug } from '@/utils/getMedBySlug';

const MedDetailPage = async ({ params }) => {
  const result = await getMedBySlug(params.medSlug);

  if (result.length === 0) {
    return notFound();
  }

  return (
    <main>
      <MainHeader title="Medication Details" />
      <MedDetailContent med={result[0]} />
      <NavLink href="/meds" className="back">
        <IoMdArrowRoundBack /> Back
      </NavLink>
    </main>
  );
};

export default MedDetailPage;
