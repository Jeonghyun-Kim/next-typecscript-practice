import React from 'react';
import { useRouter } from 'next/router';

import useUser from '../../lib/hooks/useUser';

import ExhibitionForm from '../../components/Form/ExhibitionForm';
import TextLink from '../../components/TextLink';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

export default function ExhibitionUpload() {
  const { user, loading } = useUser({
    redirectTo: '/login',
  });
  const router = useRouter();

  if (loading) return <div>loading...</div>;

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const { admin } = user;
      if (!admin) {
        router.replace('/403');
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title: e.currentTarget.exhibitionTitle.value,
      opening: e.currentTarget.opening.value,
      closing: e.currentTarget.closing.value,
    };

    try {
      const { info } = await fetcher(`${API_URL}/exhibition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user && user.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      setErrorMessage(`SUCCESS: ${JSON.stringify(info)}`);
    } catch (error) {
      const { error: errorCode } = error.data;
      if (errorCode) {
        setErrorMessage(`ERROR_CODE: ${errorCode}`);
      }
    }
  };

  return (
    <>
      <TextLink href="/admin">Back</TextLink>
      <p>{user.user && user.user.nickname}님 안녕하세요!</p>
      <ExhibitionForm errorMessage={errorMessage} onSubmit={handleSubmit} />
    </>
  );
}
