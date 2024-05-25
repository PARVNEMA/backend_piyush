const express = require("express");
const router = express.Router();
const { handleGenerateShortUrl } = require("../controllers/url");
const { handleAnalytics } = require("../controllers/url");
router.post("/", handleGenerateShortUrl);
router.get("/analytics/:shortId", handleAnalytics);
module.exports = router;
