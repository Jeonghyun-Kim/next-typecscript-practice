import React from 'react';

import fetcher from './fetcher';
import { API_URL } from '../defines';

export const getExhibitions = async (accessToken: string, setExhibitions: React.Dispatch<any>) => {
  try {
    const { info } = await fetcher(`${API_URL}/exhibition`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (info) {
      setExhibitions(info.exhibitions);
    }
  } catch (error) {
    throw new Error('Fetch Error!');
  }
};

export const setExhibition = async (
  accessToken: string,
  body: { title: string, opening: Date, closing: Date },
) => {
  try {
    const { info } = await fetcher(`${API_URL}/exhibition`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (info) {
      return info.exhibition;
    }

    throw new Error('Fetch Error!');
  } catch (error) {
    throw new Error('Fetch Error!');
  }
};

export default {
  getExhibitions,
  setExhibition,
};
