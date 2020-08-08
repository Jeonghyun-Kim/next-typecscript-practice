import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const {
    email, password, nickname, name, birth, gender = 'other', lang = 'ko',
  } = req.body;

  try {
    if (!email || !password || !nickname || !name || !birth) {
      return res.status(400).json({ errorMessage: 'fill all required inputs.' });
    }
    const { accessToken, refreshToken } = await fetcher(`${API_URL}/auth/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, nickname, name, birth, gender, lang,
      }),
    });

    const user = { isLoggedIn: true, accessToken, refreshToken };

    req.session.set('user', user);
    await req.session.save();

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    // console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
