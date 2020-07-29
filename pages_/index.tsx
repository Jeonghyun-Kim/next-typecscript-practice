import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// import cn from 'classnames';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Title>My page</Title>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/login">
        <a>login</a>
      </Link>
      <Link href="/profile">
        <a>profile</a>
      </Link>
    </>
  );
}
