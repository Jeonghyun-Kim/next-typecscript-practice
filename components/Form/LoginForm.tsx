import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  label {
    display: flex;
    flex-flow: column;
  }
  label > span {
    font-weight: 600;
  }
  input {
    padding: 8px;
    margin: 0.3rem 0 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .error {
    color: brown;
    margin: 1rem 0 0;
  }
`;

export default function LoginForm({ errorMessage, onSubmit }:
{ errorMessage: string | null, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="email">
        <span>email or nickname</span>
      </label>
      <input type="text" name="email" required />
      <label htmlFor="password">
        <span>password</span>
      </label>
      <input type="password" name="password" required />
      <button type="submit">Login</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
}
