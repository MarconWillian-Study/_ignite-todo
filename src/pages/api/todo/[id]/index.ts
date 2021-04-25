import todo from "../../../../controller/todo"

export default (req, res) => {
  if (req.method === 'DELETE') {
    return todo.delete(req, res);
  } else if (req.method === 'PATCH') {
    return todo.edit(req, res);
  } else {
    return todo.get(req, res);
  }

}