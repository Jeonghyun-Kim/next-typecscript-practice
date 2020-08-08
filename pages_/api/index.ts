import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');
  if (user) {
    return res.json({ ...user });
  }

  return res.json({ hello: 'hello world' });
});
