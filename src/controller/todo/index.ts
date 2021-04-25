import type { NextApiRequest, NextApiResponse } from 'next'

import * as uuid from 'uuid';
import { query } from 'faunadb';
import { fauna } from '../../services/fauna'

interface CreateInput {
  title: string
}

interface ResponseListTodo {
  data: {
    data: Todo;
  }[]
}

interface Todo {
  id: string;
  user: number;
  title: string;
  status: boolean;
  createdAt: string;
}

const TodoController = {
  async index(req, res){

    const todos = await fauna.query<ResponseListTodo>(
      query.Map(
        query.Paginate(
          query.Match(
            query.Index('todo_by_user_b'),
            1
          )
        ),
        query.Lambda("X", query.Get(query.Var("X")))
      )
    )

    const listTodos = todos.data.map(todo => {
      return todo.data;
    })

    res.status(200).json(listTodos)
  },
  async create(request: NextApiRequest, response: NextApiResponse){
    const { title } = request.body as CreateInput;

    const todo = { 
      id: uuid.v4(),
      user: 1,
      title,
      createdAt: new Date().toISOString(),
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
  async delete(req, res){
    const { id } = req.query

    try {
      await fauna.query(
        query.Delete(
          query.Select(
            "ref",
            query.Get(
              query.Match(
                query.Index('todo_by_id'),
                query.Casefold(id)
              )
            )
          )
        )
      )
  
      res.status(201).send()
    } catch (error) {
      res.status(400).json({
        error: true, 
        message: error.message
      })
    }
  } 
}

export default TodoController;