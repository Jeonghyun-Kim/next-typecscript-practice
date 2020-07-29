import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const { input, password } = req.body;
  try {
    console.log('login api called!');
    const { accessToken, refreshToken } = await fetcher('http://kay.ondisplay.co.kr/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, password }),
    });
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);

    const user = { isLoggedIn: true, accessToken, refreshToken };
    // TODO:
    req.session.set('user', user);
    await req.session.save();

    console.log(`user: ${JSON.stringify(req.session.get('user'))}`);

    return res.json({ user, error: 0 });
  } catch (error) {
    console.log('api/login failed!');
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
