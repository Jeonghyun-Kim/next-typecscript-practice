import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const { accessToken, refreshToken } = req.session.get('user');
  return res.json({ accessToken, refreshToken });
});
