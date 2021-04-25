import { NextApiRequest, NextApiResponse } from "next";
import todo from "../../../../controller/todo"

export default (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'DELETE') {
    return todo.delete(request, response);
  } else if (request.method === 'PATCH') {
    return todo.edit(request, response);
  } else {
    return todo.get(request, response);
  }

}