import type { NextApiRequest, NextApiResponse } from 'next'

import * as uuid from 'uuid';
import { query } from 'faunadb';
import { fauna } from '../../services/fauna'

interface CreateInput {
  title: string
}

const todo = {
  index(req, res){
    res.status(200).json({ name: 'list todos' })
  },
  async create(request: NextApiRequest, response: NextApiResponse){
    const { title } = request.body as CreateInput;

    const todo = { 
      id: uuid.v4(),
      user: 1,
      title,
      status: false
    };

    await fauna.query(
      query.Create(
        query.Collection('todos'),
        { 
          data: todo
        }
      ),
    );

    response.status(200).json(todo)
  },
  get(req, res){
    res.status(200).json({ name: 'get todo' })
  },
  edit(req, res){
    res.status(200).json({ name: 'edit todo' })
  },
  delete(req, res){
    res.status(200).json({ name: 'delete todo' })
  } 
}

export default todo;