const express = require("express");
const { createQuestion, getQuestions, getDetails, updateQuestion } = require("../controller/question");
const validateBody = require("../middlewares/validator");
const {questionIdSchema, idSchema, createQuesSchema, updateQuesSchema} = require("../validations/joi")
const router = express.Router();

//To create new question
router.post('/',validateBody(createQuesSchema), createQuestion)

router.put('/', validateBody(updateQuesSchema), updateQuestion)

//to get all the questionns that a student has posted and the answers it might have
router.get('/:rollNo',validateBody(idSchema), getQuestions)

//To get detail about a particular question, not related to any student, just the qquestion
router.get("/get/:questionId",validateBody(questionIdSchema),getDetails)

module.exports = router