import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useUser from '../lib/hooks/useUser';
import TextLink from '../components/TextLink';

import fetcher from '../lib/fetcher';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <>
      <Title>onDisplay</Title>
      <TextLink href="/about">About</TextLink>
      {user && user.isLoggedIn ? (
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
      ) : (
        <>
          <TextLink href="/login">Login</TextLink>
          <TextLink href="/signup">Signup</TextLink>
        </>
      )}
      <TextLink href="/profile">Profile</TextLink>
      {user && user.isArtist && (
        <TextLink href="/artwork/upload">Upload</TextLink>
      )}
      {user && user.admin && (
        <TextLink href="/admin">Admin</TextLink>
      )}
    </>
  );
}
