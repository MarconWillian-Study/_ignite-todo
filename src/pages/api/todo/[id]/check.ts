import { NextApiRequest, NextApiResponse } from "next";
import status from "../../../../controller/todo/status"

export default (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'PUT') {
    return status.update(request, response, true);
  } else {
    response.status(400).json({ error: true, message: 'Not allowed!' })
  }
}