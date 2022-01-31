const { getUserById } = require("../../../services/users.service");

async function requestedUser(req, res) {
  const { id } = await req.params;
  try {
    const user = await getUserById(id);
    if (user.length) {
      return res.status(200).json(user);
    }
    throw new Error("❌ The requested user doesn't exists in database");
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = requestedUser;
