const { getUsersDatabase } = require("../../../services/users.service");
const { writeDatabase } = require("../../../utils/functions");

async function createUser(req, res) {
  const [name, email] = [await req.body.name, await req.body["e-mail"]];
  const checks = [
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
      throw new Error("❌ User was not created");
    }
    const userDatabase = await getUsersDatabase("users.json");
    const newUser = { id: userDatabase.length + 1, name, "e-mail": email };
    userDatabase.push(newUser);
    writeDatabase("users.json", userDatabase);
    console.log("🚀 User was successfully created");

    return res
      .status(201)
      .json({ message: "🚀 User was successfully created" });
  } catch (error) {
    return res.status(401).json([
      { error: error.message },
      errors.map(item => {
        console.log(`❌ There are missing ${item.value} in body request`);
        return { value: item.value, errorMessage: item.errorMessage };
      }),
    ]);
  }
}

module.exports = createUser;
