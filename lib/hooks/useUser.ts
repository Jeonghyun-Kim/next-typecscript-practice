import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
}: {
  redirectTo?: any,
  redirectIfFound?: any,
} = {}) {
  const { data: user, mutate: mutateUser, error } = useSWR('/api/user');
  // const { data: accessToken } = useSWR('/api/token');

  const loading = !user && !error;
  const loggedOut = error && error.status === 403;

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn)
      // If redirectIfFound is also set, redirect if the user was found
      || (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.replace(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {
    loading,
    loggedOut,
    user,
    mutateUser,
  };
}
