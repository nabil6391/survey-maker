import { NextApiRequest, NextApiResponse } from 'next';

export default async function newQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    surveyId,
    itemOrder,
    questionType,
    title,
    valueMin,
    valueMax,
    descriptionMin,
    descriptionMax,
  } = req.body;

  console.log('req.body', req.body);
  try {
    // await addQuestion(
    //   surveyId,
    //   itemOrder,
    //   questionType,
    //   title,
    //   valueMin,
    //   descriptionMin,
    //   valueMax,
    //   descriptionMax,
    // );

    const response = await fetch(`/api/question`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: req.body})
    })
    return await response.json();
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}
