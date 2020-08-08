import React from 'react';

import useUser from '../../lib/hooks/useUser';
// import fetcher from '../../lib/fetcher';

import UploadForm from '../../components/Form/UploadForm';
import TextLink from '../../components/TextLink';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

export default function ArtworkUpload() {
  const { user, loading } = useUser({
    redirectTo: '/login',
  });

  if (loading) return <div>loading...</div>;

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('repImage', e.currentTarget.repImage.files[0]);
    formData.append('name', e.currentTarget.artworkName.value);
    formData.append('year', e.currentTarget.year.value);
    formData.append('material', e.currentTarget.material.value);
    formData.append('width', e.currentTarget.width.value);
    formData.append('height', e.currentTarget.height.value);

    try {
      const { info } = await fetcher(`${API_URL}/artwork`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user && user.accessToken}`,
        },
        body: formData,
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
      <TextLink href="/">Home</TextLink>
      <p>token: {user.accessToken}</p>
      <p>{user.user && user.user.nickname}님 안녕하세요!</p>
      <UploadForm errorMessage={errorMessage} onSubmit={handleSubmit} />
    </>
  );
}
