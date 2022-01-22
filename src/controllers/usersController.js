const {
  getUserById,
  getUsersDatabase,
  writeDatabase,
} = require("../services/users.service");

module.exports = {
  async requestedUser(req, res) {
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
  },
  async updateUser(req, res) {
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
        throw new Error();
      }
      const userDatabase = await getUsersDatabase("users.json");
      const newUserData = { ...user[0], name, "e-mail": email };
      const rawArray = userDatabase.filter(item => item.id !== Number(id));
      rawArray.push(newUserData);
      rawArray.sort((a, b) => (a.id > b.id ? 1 : -1));
      writeDatabase("users.json", rawArray);

      return res.status(200).json({ message: "Successfully updated user" });
    } catch (error) {
      return res.status(400).json(
        errors.map(item => {
          console.log(
            `The ${item.value} value isn't correct\n`,
            item.errorMessage
          );
          return { value: item.value, errorMessage: item.errorMessage };
        })
      );
    }
  },
};
