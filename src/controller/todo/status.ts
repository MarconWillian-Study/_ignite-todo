const status = {
  update(req, res){
    res.status(200).json({ name: 'update status' })
  }
}

export default status;