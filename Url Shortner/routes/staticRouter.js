const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    const allurls = await Url.find({});
    return res.render("home", {
        urls: allurls,
    });
});

module.exports = router;
