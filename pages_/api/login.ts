import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const { input, password } = await req.body;
  try {
    const { accessToken, refreshToken } = await fetcher({
      url: '/auth/login',
      method: 'POST',
      body: JSON.stringify({ input, password }),
    });

    req.session.set('access_token', accessToken);
    req.session.set('refresh_token', refreshToken);
    await req.session.save();

    return res.json({ accessToken, error: 0 });
  } catch (error) {
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
