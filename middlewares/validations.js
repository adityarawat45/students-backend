const { courseSchema, addressSchema, studentSchema, idSchema, courseIdSchema } = require("../validations/joi");

const courseValidator = async (req, res, next) => {
    const { courseName, courseFee, semesters } = req.body; 
    const { error } = courseSchema.validate({ courseName, courseFee, semesters });

    if (error) {
        return res.status(400).json({ 
            message: "There were validation issues with this course",
            error
        });
    }
    next();
};

const addressValidator = async (req, res, next) => {
    const { address, city, state, pinCode } = req.body; 
    const { error } = addressSchema.validate({ address, city, state, pinCode });

    if (error) {
        return res.status(400).json({ 
            message: "There were validation issues with these inputs",
            error
        });
    }
    next();
};

const studentValidator = async (req, res, next) => {
    const { firstName, lastName, email, phoneNo, courseId } = req.body; 
    const { error } = studentSchema.validate({ firstName, lastName, email, phoneNo, courseId });

    if (error) {
        return res.status(400).json({
            message: "Validation errors with these inputs",
            error
        });
    }
    next();
};

const updateIdValidator = async (req,res,next) => {
    const rollNo = req.body.rollNo;
    const {error} =  idSchema.validate({rollNo});

    if(error) {
        return res.status(400).json({
            message : "Incorrect datatype for rollNo",
            error
        })
    }
    next();
}

const idValidator = async(req,res,next)=> {
    const rollNo = req.params['rollNo']
    const {error} =  idSchema.validate({rollNo});

    if(error) {
        return res.status(400).json({
            message : "Incorrect datatype for rollNo",
            error
        })
    }
    next();
}

const courseIdValidator = async(req,res,next) => {
    const courseId = req.params["courseId"]
    const {error} =  courseIdSchema.validate({courseId});

    if(error) {
        return res.status(400).json({
            message : "Incorrect datatype for rollNo",
            error
        })
    }
    next();
}

module.exports = { 
    courseValidator,
    addressValidator,
    studentValidator,
    idValidator,
    courseIdValidator,
    updateIdValidator
};
