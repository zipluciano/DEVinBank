async function sendFile(req, res) {
  res.status(200).send({ message: "hello from send file" });
}

module.exports = sendFile;
