module.exports = {
  async hello(req, res) {
    res.status(200).send({ message: "Hello World!" });
  },
};
