import React from 'react';
import styled from 'styled-components';

import useUser from '../lib/hooks/useUser';
import TextLink from '../components/TextLink';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Title>My page</Title>
      <TextLink href="/about">About</TextLink>
      <TextLink href="/login">Login</TextLink>
      <TextLink href="/signup">Signup</TextLink>
      <TextLink href="/profile">Profile</TextLink>
      <TextLink href="/artwork/upload">Upload</TextLink>
      {user && user.admin && (
        <TextLink href="/admin">Admin</TextLink>
      )}
    </>
  );
}
