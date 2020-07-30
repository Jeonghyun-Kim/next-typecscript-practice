import { API_URL } from '../defines';

interface ErrorWithResponse extends Error {
  response: Response;
  data: any;
}

const refresh = async (tokens: { accessToken: string, refreshToken: string }) => {
  const { accessToken, refreshToken } = tokens;
  try {
    console.log('refresh called!');
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const { accessToken: newAccessToken, error } = await response.json();

    if (error) {
      return { error };
    }

    return { newAccessToken, error };
  } catch (error) {
    console.log('refresh failed!');
    return { error };
  }
};

export default async function fetcher(
  url: string,
  option?: any,
  tokens?: { accessToken: string, refreshToken: string },
) {
  try {
    console.log(`fetcher called! url: ${url}`);

    let response = await fetch(url, option);

    if (tokens && response.status === 419) {
      console.log('token expired');
      const {
        newAccessToken,
      } = await refresh(tokens);

      response = await fetch(url, {
        ...option,
        headers: {
          ...option.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('token renewed');
        console.log(`response with renewed token: ${JSON.stringify(data)}`);
        return {
          ...data,
          newAccessToken,
        };
      }
    }

    const data = await response.json();

    if (response.ok) {
      console.log(`response only with data: ${JSON.stringify(data)}`);
      return data;
    }

    const error = new Error(response.statusText) as ErrorWithResponse;
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    console.error('fetcher error', error);
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
