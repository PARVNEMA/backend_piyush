const user = require("../models/user");

async function handleGetAllUsers(req, res) {
  const dbusers = await user.find({});

  return res.json(dbusers);
}

async function handlegetUserById(req, res) {
  const use = await user.findById(req.params.id);
  if (!use) {
    return res.status(404).json({ err: "not found user" });
  }
  return res.json(use);
}

async function handleUpdateUserById(req, res) {
  await user.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

  return res.json({ status: "changed" });
}
async function handleDeleteUserById(req, res) {
  await user.findByIdAndDelete(req.params.id);

  return res.json({ status: "deleted" });
}
async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ status: "fail", message: "data missing" });
  }
  const result = await user.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobtitle: body.job_title,
  });

  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
