import React from 'react';
import { useRouter } from 'next/router';

import useUser from '../lib/hooks/useUser';
import TextLink from '../components/TextLink';
import { getExhibitions } from '../lib/exhibition';

export default function AdminPage() {
  const { user } = useUser({
    redirectTo: '/login',
  });
  const [exhibitions, setExhibitions] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      const { admin } = user;
      if (!admin) {
        router.replace('/403');
      }
      getExhibitions(user.accessToken, setExhibitions);
    }
  }, [user]);

  return (
    <>
      <TextLink href="/">Home</TextLink>
      <div>this page will be transformed to the admin dashbaord which can handle admin APIs.</div>
      {exhibitions && (
        <div>exhibition: {JSON.stringify(exhibitions)}</div>
      )}
      <TextLink href="/exhibition/upload">Register</TextLink>
    </>
  );
}
