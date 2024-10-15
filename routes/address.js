const express = require("express");
const router = express.Router();
const { getAll, insert} = require("../controller/address");
const { addressValidator } = require("../middlewares/validations");

//To insert a new address
router.post("/insert",addressValidator, insert)

//Get the addresses of all students, with student's name and rollNo
router.get('/all', getAll)

module.exports = router