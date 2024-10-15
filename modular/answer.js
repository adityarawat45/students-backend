const { sequelize,Address, Student, Answer, Question } = require("../models");

const createNewQues = (rollNo, questionId, answer)=> {
    const ans = Answer.create({
        rollNo, questionId, answer
    })
    return ans
}

const updateAns = (answerId, answer) => {
    const ans =  Answer.update({
        answer
     },{where : {answerId}})
     return ans;
}
module.exports = {
    createNewQues,
    updateAns
}