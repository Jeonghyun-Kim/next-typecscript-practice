import React from 'react';
import { useRouter } from 'next/router';
import useUser from '../lib/hooks/useUser';
import fetcher from '../lib/fetcher';

export default function Profile() {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {JSON.stringify(user)}
      <a
        href="/api/logout"
        onClick={async (e) => {
          e.preventDefault();
          await mutateUser(fetcher('/api/logout'));
          router.push('/login');
        }}
      >
        Logout
      </a>
    </div>
  );
}
