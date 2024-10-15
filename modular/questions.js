const { sequelize,Address, Student, Answer, Question } = require("../models");

const createQues = (question, rollNo) => {
    const newQues = Question.create({
        question,
        rollNo,
    });
    return newQues;
}

const updateQues = (questionId, question) => {
    const updatedQues = Question.update({
        question
     },
     {where :{ questionId}}
 )
 return updatedQues
}

const getQues = (rollNo) => {
    const questions =  Question.findAll({
        where : {
            rollNo
        },
        include: [
            {
                model: Student, 
                attributes: ['firstName'],
            }
        ]
    })
    return questions;
}

const getQuesDetails = (questionId) => {
    const question = Question.findOne({
        where : { questionId},
        include : [
             {
              model : Answer,
              attributes : ['answer', 'rollNo']
             }
        ]
     })
     return question
}

module.exports = {createQues, updateQues, getQues, getQuesDetails}