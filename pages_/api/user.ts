import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');

  if (!user) {
    return res.json({
      isLoggedIn: false,
      isArtist: false,
    });
  }

  const { accessToken, refreshToken } = user;

  try {
    let response = await fetch(`${API_URL}/user/info`, {
      headers: accessToken ? {
        Authorization: `Bearer ${accessToken}`,
      } : undefined,
    });

    if (response.status === 419) {
      const { accessToken: newAccessToken } = await fetcher(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      response = await fetch(`${API_URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      req.session.set('user', {
        ...user,
        accessToken: newAccessToken,
      });
      await req.session.save();
    }

    const { info } = await response.json();

    if (info) {
      return res.json({
        accessToken,
        isLoggedIn: true,
        ...info,
      });
    }

    return res.json({
      isLoggedIn: false,
      isArtist: false,
    });
  } catch (error) {
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
