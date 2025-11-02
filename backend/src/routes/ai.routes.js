const express = require("express");
const router = express.Router();
const { aiReply } = require("../controllers/ai.controller"); // ✅ correct destructuring

router.post("/reply", aiReply); // ✅ only function reference, not object

module.exports = router;
