import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const accessToken = req.session.get('access_token');
  // const refreshToken = req.session.get('refresh_token');

  try {
    const { info } = await fetcher({
      url: '/user/info',
      token: accessToken,
    });

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
    console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
