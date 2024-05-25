const express = require("express");
const Url = require("../models/url");
const { restricTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restricTo(["ADMIN"]), async (req, res) => {
  const allurls = await Url.find({});
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/", restricTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allurls = await Url.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
