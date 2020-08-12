import React from 'react';
import { useRouter } from 'next/router';

import useUser from '../lib/hooks/useUser';
import TextLink from '../components/TextLink';
import { getExhibitions } from '../lib/exhibition';
import { getUsers } from '../lib/user';

export default function AdminPage() {
  const { user } = useUser({
    redirectTo: '/login',
  });
  const [exhibitions, setExhibitions] = React.useState<any>(null);
  const [users, setUsers] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      const { admin } = user;
      if (!admin) {
        router.replace('/403');
      }
      getExhibitions(user.accessToken, setExhibitions);
      getUsers(user.accessToken, setUsers);
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
      {users && users.map((item: any) => (
        <>
          <div>id: {item.id}</div>
          <div>email: {item.email}</div>
          <div>name: {item.name}</div>
          <div>birth: {item.birth}</div>
          <div>gender: {item.gender}</div>
          <br />
        </>
      ))}
    </>
  );
}
