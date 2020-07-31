import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  padding: 2px;
  margin: 0 1rem;

  &:hover {
    cursor: pointer;
  }
`;

export default function TestLink({ href, children, ...rest }:
{ href: string, children: React.ReactNode }) {
  return (
    <Link href={href} {...rest}>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
}
