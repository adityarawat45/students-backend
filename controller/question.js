// const { where } = require("sequelize");
const { sequelize,Address, Student, Answer, Question } = require("../models");
const { createQues, updateQues, getQues, getQuesDetails } = require("../modular/questions");
const createQuestion = async(req,res)=> {
    try {
        const { question, rollNo } = req.body;
        const newQuestion = await createQues(question, rollNo);
        res.status(200).json({
           message : "Question created succesfully",
           newQuestion
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the question.' ,
            error : error.message
        });
    }
};

const updateQuestion = async(req,res)=> {
    try {
        const { questionId, question} = req.body;

        const updatedQues = await updateQues(questionId, question)
        res.status(200).json({
            message : "Question updated succesfully",
            updatedQues
    })
        
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while updating the question.' ,
            error : error.message
        });
    }
}

const getQuestions = async(req,res)=> {
    try {
        const rollNo = req.params['rollNo']
        const questions = await getQues(rollNo)
        res.json({
            questions
        })
    }
    catch(error) {
        res.json({
            message : "Some error occured",
            error : error.message
        })
    }
}

const getDetails = async(req,res)=> {
    const questionId = req.params["questionId"];
    try{
       const questions = await getQuesDetails(questionId)
       res.status(200).json({
        questions
       })
    }
    catch(error) {
        res.status(500).json({
            message : "Some error occured",
            error : error.message
        })
    }
}

module.exports = {createQuestion, getDetails, getQuestions, updateQuestion}

