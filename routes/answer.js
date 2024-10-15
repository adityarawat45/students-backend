const express = require("express");
const { createAnswer , updateAnswer} = require("../controller/answer");
const validateBody = require("../middlewares/validator");
const { createAnsSchema } = require("../validations/joi");
const router = express.Router();

router.post("/",validateBody(createAnsSchema), createAnswer)
router.put("/", updateAnswer);


module.exports = router;