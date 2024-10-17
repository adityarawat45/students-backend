const Joi = require("joi");
const {namePattern, emailPattern, phoneNoPattern} = require("./regex")

const courseSchema = Joi.object({
    courseName : Joi.string().min(2).required(),
    courseFee : Joi.string().required(),
    semesters : Joi.number().required()
})

const addressSchema = Joi.object({
    address : Joi.string().min(5).required(),
    city : Joi.string().min(3).required(),
    state : Joi.string().min(3).required(),
    pinCode : Joi.string().min(6).required()
})

const studentSchema = Joi.object({
    firstName : Joi.string().min(3).required().regex(namePattern),
    lastName : Joi.string().min(3).required().regex(namePattern),
    email : Joi.string().email().required().regex(emailPattern),
    phoneNo :  Joi.number().min(10).required(),
    courseId : Joi.number().required(),
    addressId : Joi.number().optional()
})

const idSchema = Joi.object({
    rollNo : Joi.number().required(),
})

const courseIdSchema = Joi.object({
    courseId : Joi.number().required()
})

const studentaddressSchema = Joi.object({
    firstName : Joi.string().min(3).required().regex(namePattern),
    lastName : Joi.string().min(3).required().regex(namePattern),
    email : Joi.string().email().required().regex(emailPattern),
    phoneNo :  Joi.number().min(10).required(),
    courseId : Joi.number().required(),
    addressId : Joi.number().optional(),
    address : Joi.string().min(5).required(),
    city : Joi.string().min(3).required(),
    state : Joi.string().min(3).required(),
    pinCode : Joi.string().min(6).required()
})

const questionIdSchema = Joi.object({
    questionId : Joi.number().required()
})

const createQuesSchema = Joi.object({
    "rollNo" : Joi.number().required(),
    "question" : Joi.string().required()
})
const updateQuesSchema = Joi.object({
    "question" : Joi.string().required(),
    "questionId" : Joi.number().required()
})

const createAnsSchema = Joi.object({
    "rollNo" : Joi.number().required(),
    "answer" : Joi.string().required(),
    "questionId" : Joi.number().required()
})

module.exports = {courseSchema, studentSchema, addressSchema, idSchema, courseIdSchema, studentaddressSchema, questionIdSchema,createQuesSchema, createAnsSchema, updateQuesSchema}