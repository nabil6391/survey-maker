import { NextApiRequest, NextApiResponse } from 'next';
// import { useRouter } from 'next/router';
// import { insertResponse } from '../../util/database';

export default async function insertResponseHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const router = useRouter();
  const { responseValues } = req.body;

  console.log('req.body', req.body);

  try {
    // await insertResponse(responseValues);

    const response = await fetch(`/api/response`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: req.body})
    })
  } catch (err) {
    return res.status(500).send({ success: false });
  }

  res.send({ success: true });
  // router.push('/edit/1')
}
