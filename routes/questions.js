const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/daily/:id/:size", questionController.get_daily_questions);
router.get("/:id", questionController.show_my_questions);
router.post("/", questionController.add_question);

module.exports = router;
