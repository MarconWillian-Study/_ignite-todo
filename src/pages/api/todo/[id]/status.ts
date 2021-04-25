import status from "../../../../controller/todo/status"

export default (req, res) => {
  if (req.method === 'PUT') {
    return status.update(req, res);
  } else {
    res.status(400).json({ error: true, message: 'Not allowed!' })
  }

}