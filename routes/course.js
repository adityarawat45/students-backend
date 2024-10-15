const express = require("express");
const router = express.Router();
const {insert, getCourses, getCourse} = require("../controller/course")
const {courseValidator, courseIdValidator} = require("../middlewares/validations");
const validateBody = require("../middlewares/validator");
const { courseSchema, courseIdSchema } = require("../validations/joi");



//To insert a new  course
router.post("/insert", validateBody(courseSchema), insert);

//To get all courses, with the enrolled students 
router.get('/getcourses', getCourses) //No validator because it's just fetching every single course

//To get a single course, through its courseId
router.get('/get/:courseId',validateBody(courseIdSchema), getCourse)

module.exports = router