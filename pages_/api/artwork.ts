import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import fetcher from '../../lib/fetcher';

import { API_URL } from '../../defines';

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  const {
    repImage, name, year, material, width, height,
  } = req.body;

  const formData = new FormData();
  formData.append('repImage', repImage);
  formData.append('name', name);
  formData.append('year', year);
  formData.append('material', material);
  formData.append('width', width);
  formData.append('height', height);

  const { accessToken } = req.session;

  try {
    const info = await fetcher(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    return res.json({ info });
  } catch (error) {
    // console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
});
