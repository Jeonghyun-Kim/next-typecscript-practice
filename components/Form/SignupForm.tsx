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

  #email {
    ime-mode: disabled;
  }

  #password {
    ime-mode: disabled;
  }
`;

export default function SignupForm({ errorMessage, onSubmit }:
{ errorMessage: string | null, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="email">
        <span>email</span>
      </label>
      <input id="email" type="text" name="email" required />
      <label htmlFor="password">
        <span>password</span>
      </label>
      <input id="password" type="password" name="password" required />
      <label htmlFor="username">
        <span>nickname</span>
      </label>
      <input type="text" name="username" required />
      <label htmlFor="fullname">
        <span>full name</span>
      </label>
      <input type="text" name="fullname" required />
      <label htmlFor="birth">
        <span>birth</span>
      </label>
      <input type="text" name="birth" required />
      <label htmlFor="gender">
        <span>gender</span>
      </label>
      <input type="text" name="gender" required />
      <button type="submit">Signup</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
}
