import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import useUser from '../lib/hooks/useUser';
import fetcher from '../lib/fetcher';

import SignupForm from '../components/Form/SignupForm';
import TextLink from '../components/TextLink';

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
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      nickname: e.currentTarget.username.value,
      name: e.currentTarget.fullname.value,
      birth: e.currentTarget.birth.value,
      gender: e.currentTarget.gender.value,
    };

    try {
      const { accessToken, refreshToken } = await fetcher('/api/signup', {
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
    } catch (error) {
      const { error: errorCode } = error.data;
      if (errorCode) {
        setErrorMessage(t(`common:error_code.${errorCode}`));
      } else if (error.message && error.message === 'Failed to fetch') {
        setErrorMessage(t('common:check_network'));
      } else {
        setErrorMessage(t('common:uncaught_error'));
      }
    }
  };

  return (
    <>
      <TextLink href="/">Home</TextLink>
      <div className="login">
        <SignupForm errorMessage={errorMessage} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
