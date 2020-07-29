import React from 'react';

import useUser from '../lib/hooks/useUser';
import LoginForm from '../components/Form/LoginForm';
import fetcher from '../lib/fetcher';

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      input: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      await mutateUser(
        fetcher('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }),
      );
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  return (
    <div className="login">
      <LoginForm errorMessage={errorMessage} onSubmit={handleSubmit} />
    </div>
  );
}
