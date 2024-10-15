const {getAllCourses, createCourse, getCourseThroughId} = require("../modular/course")

const insert = async(req,res)=> {
    const courseName = req.body.courseName;
    const courseFee = req.body.courseFee;
    const semesters = req.body.semesters;
    try {
        const course = createCourse(courseName, courseFee, semesters);
        res.json({
            message: "Course created successfully",
            id: course.courseId
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({
            message: "Some error occurred",
            error: error.message
        });
    }
}

const getCourse = async(req,res) => {
    const courseId = req.params["courseId"];
    try {
        const course = await getCourseThroughId(courseId);
        res.json({
            course
        })
    }
    catch (error) {
        res.status(403).json( {
            message : "Some error occured",
            error
        })
    }
}
const getCourses = async (req,res) => {
    try {
        const courses = await getAllCourses();
        res.status(200).json({
            courses
        })
    }
    catch(error) {
        res.status(500).json({
            message : "Some error occured"
        })
    }
}

module.exports = {insert, getCourses, getCourse}