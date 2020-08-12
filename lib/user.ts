import React from 'react';

import fetcher from './fetcher';
import { API_URL } from '../defines';

export const getUsers = async (accessToken: string, setUsers: React.Dispatch<any>) => {
  try {
    const { info } = await fetcher(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (info) {
      setUsers(info.users);
    }
  } catch (error) {
    throw new Error('Fetch Error!');
  }
};

export default {
  getUsers,
};
