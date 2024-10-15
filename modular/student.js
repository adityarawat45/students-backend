const {Student, Course, Address} = require("../models");

//To create a student 
const createStudent = (firstName, lastName, email, phoneNo, courseId, addressId, tran) => {
    const student = Student.create({
        firstName, lastName, email, phoneNo, courseId, addressId
    },
    {
        transaction : tran
    })
    return student; 
}

//Get all the details about a particular student through his rollNo
const getStudentDetails = (rollNo) => {
   const student = Student.findOne({
        where: {
          rollNo: rollNo
        },
        include: [
          {
            model: Course,
            attributes : ["courseName", "semesters"]
          },
          {
            model: Address,
            attributes : ["address", "city", "pinCode"]
          }
        ]
      });
      return student;
}

//Get all the existinf students from the datbase
const getStudents =() => {
    const students  = Student.findAll({})
    return students
}


module.exports = {createStudent, getStudentDetails, getStudents}