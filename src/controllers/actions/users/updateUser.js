const {
  getUserById,
  getUsersDatabase,
} = require("../../../services/users.service");
const { writeDatabase } = require("../../../utils/functions");

async function updateUser(req, res) {
  const [id, name, email] = [
    await req.params.id,
    await req.body.name,
    await req.body["e-mail"],
  ];
  const user = await getUserById(id);
  const checks = [
    {
      has: Boolean(user.length),
      value: "id",
      errorMessage: "❌ The requested user doesn't exists in database",
    },
    {
      has: Boolean(name),
      value: "name",
      errorMessage: "❌ There are missing name in body request",
    },
    {
      has: Boolean(email),
      value: "e-mail",
      errorMessage: "❌ There are missing e-mail in body request",
    },
  ];
  const errors = checks.filter(item => !item.has);
  try {
    if (errors.length) {
      throw new Error("❌ User was not updated");
    }
    const userDatabase = await getUsersDatabase("users.json");
    const newUserData = { ...user[0], name, "e-mail": email };
    const rawArray = userDatabase.filter(item => item.id !== Number(id));
    rawArray.push(newUserData);
    rawArray.sort((a, b) => (a.id > b.id ? 1 : -1));
    writeDatabase("users.json", rawArray);
    console.log("🚀 User was successfully updated");

    return res
      .status(200)
      .json({ message: "🚀 User was successfully updated" });
  } catch (error) {
    return res.status(400).json([
      { error: error.message },
      errors.map(item => {
        console.log(`❌ There are missing ${item.value} in body request`);
        return { value: item.value, errorMessage: item.errorMessage };
      }),
    ]);
  }
}

module.exports = updateUser;
