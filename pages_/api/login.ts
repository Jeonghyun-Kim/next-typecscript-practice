import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const { input, password } = req.body;
  try {
    const { accessToken, refreshToken } = await fetcher(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, password }),
    });

    const user = { isLoggedIn: true, accessToken, refreshToken };

    req.session.set('user', user);
    await req.session.save();

    return res.json({ user, error: 0 });
  } catch (error) {
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
