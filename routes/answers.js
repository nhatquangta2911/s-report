const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answerController");

router.get("/:id/:date", answerController.show_my_answers);

module.exports = router;
