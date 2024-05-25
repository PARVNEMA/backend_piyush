const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

router.get("/", handleGetAllUsers);

// router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router.get("/:id", handlegetUserById);

router.post("/", handleCreateNewUser);

router.patch("/:id", handleUpdateUserById);

router.delete("/:id", handleDeleteUserById);

module.exports = router;
