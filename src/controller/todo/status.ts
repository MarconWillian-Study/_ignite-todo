import { query } from "faunadb"
import { NextApiRequest, NextApiResponse } from "next"
import { fauna } from "../../services/fauna"

const status = {
  async update(request: NextApiRequest, response: NextApiResponse, status: boolean){
    const { id } = request.query

    try {
      await fauna.query(
        query.Update(
          query.Select(
            "ref",
            query.Get(
              query.Match(
                query.Index('todo_by_id'),
                query.Casefold(id)
              )
            )
          ),
          {
            data: { 
              status
            }
          }
        ),
      )
  
      response.status(201).json({ id, status});
    } catch (error) {
      response.status(400).json({
        error: true, 
        message: error.message
      })
    }
  }
}

export default status;