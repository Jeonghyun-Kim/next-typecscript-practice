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

export default function ExhibitionForm({ errorMessage, onSubmit }:
{ errorMessage: string | null, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="exhibitionTitle">
        <span>title</span>
      </label>
      <input type="text" name="exhibitionTitle" required />
      <label htmlFor="opening">
        <span>opening</span>
      </label>
      <input type="text" name="opening" required />
      <label htmlFor="closing">
        <span>closing</span>
      </label>
      <input type="text" name="closing" required />
      <button type="submit">Submit</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
}
