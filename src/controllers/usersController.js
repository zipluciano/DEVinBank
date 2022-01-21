const { getUserById } = require("../services/users.service");

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
        errorMessage: "❌ The requested user doesn't exists in database",
      },
      {
        has: Boolean(name),
        errorMessage: "❌ There are missing name in body request",
      },
      {
        has: Boolean(email),
        errorMessage: "❌ There are missing e-mail in body request",
      },
    ];
    const errors = checks.filter(item => !item.has);
    try {
      if (errors.length) {
        throw new Error();
      }
      // TODO: create service to update user database
      console.log(req.body, checks, errors);
      const newUserData = { ...user[0], name, "e-mail": email };
      console.log(
        "🚀 ~ file: usersController.js ~ line 29 ~ updateUser ~ newUserData",
        newUserData
      );
      return res.status(200).json([newUserData]);
    } catch (error) {
      return res.status(400).json(
        errors.map(item => {
          console.log(item.errorMessage);
          return { errorMessage: item.errorMessage };
        })
      );
    }
  },
};
