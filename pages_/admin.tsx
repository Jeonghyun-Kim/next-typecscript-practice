import React from 'react';
import { useRouter } from 'next/router';

import useUser from '../lib/hooks/useUser';
import TextLink from '../components/TextLink';

export default function AdminPage() {
  const { user } = useUser({
    redirectTo: '/login',
  });
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      const { admin } = user;
      if (!admin) {
        router.replace('/403');
      }
    }
  }, [user]);

  return (
    <>
      <TextLink href="/">Home</TextLink>
      <div>this page will be transformed to the admin dashbaord which can handle admin APIs.</div>
    </>
  );
}
