import todo from "../../../controller/todo"

export default (req, res) => {
  if (req.method === 'POST') {
    return todo.create(req, res);
  } else {
    return todo.index(req, res);
  }

}