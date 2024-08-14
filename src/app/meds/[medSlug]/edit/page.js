import { GrEdit } from 'react-icons/gr';
import { notFound } from 'next/navigation';

import MainHeader from '@/components/MainHeader/MainHeader';
import EditMedForm from '@/components/Forms/EditMedForm';
import { getMedBySlug } from '@/utils/getMedBySlug';

const EditMedDetail = async ({ params }) => {
  const result = await getMedBySlug(params.medSlug);

  if (result.length === 0) {
    return notFound();
  }
  return (
    <main>
      <MainHeader title="Edit Medication" icon={<GrEdit />} />
      <EditMedForm med={result[0]} />
    </main>
  );
};
export default EditMedDetail;
