const todo = {
  index(req, res){
    res.status(200).json({ name: 'list todos' })
  },
  create(req, res){
    res.status(200).json({ name: 'create todo' })
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