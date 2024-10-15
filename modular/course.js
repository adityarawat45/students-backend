const {Student, Course, Address} = require("../models");

//To create a course
const createCourse = (courseName, courseFee, semesters) => {
    const course = Course.create({
       courseName, courseFee, semesters
    })
    return course
}

//To get all the courses
const getAllCourses = () => {
    const courses = Course.findAll({
        include : [{
            model : Student,
            attributes : ['firstName', 'rollNo']
        }]
    })
    return courses
}

const getCourseThroughId =(courseId) => {
    const course = Course.findOne({
        where : {
            courseId
        }
    })
    return course
}

module.exports = {createCourse, getAllCourses, getCourseThroughId};