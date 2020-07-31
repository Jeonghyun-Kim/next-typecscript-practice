import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import useUser from '../lib/hooks/useUser';
import LoginForm from '../components/Form/LoginForm';
import fetcher from '../lib/fetcher';

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      input: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const { accessToken, refreshToken } = await fetcher('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      mutateUser({
        isLoggedIn: true,
        accessToken,
        refreshToken,
      });

      return;
    } catch (error) {
      const { error: errorCode } = error.data;
      if (errorCode) {
        setErrorMessage(t(`errorCode.${errorCode}`));
      } else if (error.message && error.message === 'Failed to fetch') {
        setErrorMessage(t('common:check_network'));
      } else {
        setErrorMessage(t('common:uncaught_error'));
      }
    }
  };

  return (
    <div className="login">
      <LoginForm errorMessage={errorMessage} onSubmit={handleSubmit} />
    </div>
  );
}
