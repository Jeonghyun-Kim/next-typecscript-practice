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
    return res.status(403).json({ errorMessage: 'login first...' });
  }

  const { accessToken, refreshToken } = user;

  try {
    const { accessToken: newAccessToken } = await fetcher(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    req.session.set('user', {
      ...user,
      accessToken: newAccessToken,
    });
    await req.session.save();

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
});
