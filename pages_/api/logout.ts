import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  req.session.destroy();
  return res.json({ isLoggedIn: false });
});
