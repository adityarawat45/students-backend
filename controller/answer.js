const { sequelize,Address, Student, Answer, Question } = require("../models");
const { createNewQues, updateAns } = require("../modular/answer");

const createAnswer = async(req,res) => {
    const {rollNo, questionId, answer} = req.body;
    try{
       const newanswer = await createNewQues(rollNo, questionId, answer)
       res.status(200).json({
        message : "Answer created succesfully",
        newanswer
       })
    }
    catch(error) {
       res.status(500).json({
        message : "Some error occured",
        error : error.message
       })
    } 
}

const updateAnswer = async(req,res) => {
    try {
        const {answerId, answer} = req.body;
        const  ans = await updateAns(answerId, answer)
        res.status(200).json({
            message : "Answer updated succesfully",
            ans
        })
    }
    catch(error) {
        res.status(500).json({
            message : "Eome error occured",
            error : error.message
        })
    }
}

module.exports = {createAnswer, updateAnswer}