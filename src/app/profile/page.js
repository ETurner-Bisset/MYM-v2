import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import ProfileContent from '@/components/profile/ProfileContent';
import { authOptions } from '@/auth';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  if (session?.status === 'loading') {
    return <p>Loading...</p>;
  }

  return <ProfileContent user={session.user} />;
};

export default ProfilePage;
