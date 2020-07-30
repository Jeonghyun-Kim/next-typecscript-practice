import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  console.log('api/user called!');
  const user = req.session.get('user');

  if (!user) {
    return res.json({
      isLoggedIn: false,
    });
  }

  const { accessToken, refreshToken } = user;

  try {
    const { newAccessToken, ...info } = await fetcher(`${API_URL}/user/info`, {
      headers: accessToken ? {
        Authorization: `Bearer ${accessToken}`,
      } : undefined,
    }, { accessToken, refreshToken });

    console.log(`info: ${JSON.stringify(info)}`);

    if (newAccessToken) {
      req.session.set('user', {
        isLoggedIn: true,
        accessToken: newAccessToken,
        refreshToken,
      });
      await req.session.save();

      console.log('renewed token saved!');
    }

    if (info) {
      return res.json({
        isLoggedIn: true,
        ...info,
      });
    }

    return res.json({
      isLoggedIn: false,
    });
  } catch (error) {
    console.error(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
