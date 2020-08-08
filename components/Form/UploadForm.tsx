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

export default function UploadForm({ errorMessage, onSubmit }:
{ errorMessage: string | null, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="repImage">
        <span>repImage</span>
      </label>
      <input type="file" name="repImage" required />
      <label htmlFor="artworkName">
        <span>name</span>
      </label>
      <input type="text" name="artworkName" required />
      <label htmlFor="year">
        <span>year</span>
      </label>
      <input type="text" name="year" required />
      <label htmlFor="material">
        <span>material</span>
      </label>
      <input type="text" name="material" required />
      <label htmlFor="width">
        <span>width</span>
      </label>
      <input type="text" name="width" required />
      <label htmlFor="height">
        <span>height</span>
      </label>
      <input type="text" name="height" required />
      <button type="submit">Submit</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </Form>
  );
}
