const { sequelize,Address, Student, Answer, Question } = require("../models");
const {Op, where} = require("sequelize");
const {createStudent, getStudentDetails, getStudents} = require("../modular/student");
const {createAddress} = require("../modular/address");

const insertAll = async (req,res) => {
    const {firstName, lastName, email, phoneNo, courseId, address, city, state , pinCode} = req.body;
    
    const tran = await sequelize.transaction()
    try {
        const add = await createAddress(address, city, state, pinCode, tran);
        if(!add) return res.status(403).json({
            message : "The inputs are not correct!"
        })
        
        const addressId = add.addressId
        const stud = await createStudent(firstName, lastName, email, phoneNo, courseId, addressId, tran)
        await tran.commit();
        res.status(200).json({
            message : "Student created succesfully",
            student : stud,
            address : add
        })
    }

    catch(error) {
        await tran.rollback(); 
        res.status(403).json({
            message : "Oops! Some error occured",
            error
        })
    }
}

const insert = async (req,res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo= req.body.phoneNo;
    const email = req.body.email;
    const courseId = req.body.courseId;
    const addressId = req.body.addressId;
    try {
        const student = await createStudent(firstName, lastName, phoneNo, email, courseId, addressId);
        res.status(200).json({
            message : "Student created succesfully",
            id : student.rollNo
        }) 
    }
    catch (error){
        res.status(403).json({
            message : "Error while inserting"
        })
    }
}


//get all the details about a particular student, based on his rollno
const getDetails = async (req,res)=> {
    const rollNo = req.params['rollNo']
    try {
      const student = await getStudentDetails(rollNo);
      if (!student) {
        return res.status(403).json({ message: "Student not found" });
      }
      res.json({
        message: "Student details:",
        student
      });
    } catch (error) {
      res.status(500).json({ message: "OOPS! Something went wrong", error: error.message });
    }
}


//get all the students
const getAll = async (req,res)=> {
    try { 
        const students = await getStudents();
        res.status(200).json({
          students
        })
    }
    catch (error) {
        res.status(403).json({
            message : "OOPS! Some error occured",
            error : error.message
        })
    }
}

const deleteStudent = async (req, res) => {
    const rollNo = req.body.rollNo;
    const t = await sequelize.transaction(); 
    try {
        const student = await Student.findOne({
            where: { rollNo },
            include: [{ model: Address }]
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        
        //Using a trigger for the below commented stuff

        if (student.addressId) {
            await Address.destroy({
                where: { addressId: student.addressId },
                transaction: t
            });
        }

        await student.destroy({ transaction: t });
        await t.commit();

        res.status(200).json({
            message: "Student and address deleted successfully"
        });
    } catch (error) {
        console.log(error.message)
        await t.rollback(); 
        res.status(500).json({
            message: "An error occurred while deleting the student",

        });
    }
};

const deletePermanent = async (req, res) => {
    const rollNo = req.body.rollNo;

    const t = await sequelize.transaction(); 
    try {
        const student = await Student.findOne({
            where: { rollNo },
            include: [{ model: Address }]
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        if (student.addressId) {
            await Address.destroy({
                where: { addressId: student.addressId },
                transaction: t,
                force : true
            });
        }

        await student.destroy({ transaction: t, force : true});
        await t.commit();

        res.status(200).json({
            message: "Student and address deleted successfully"
        });
    } catch (error) {
        console.log(error.message)
        await t.rollback(); 
        res.status(500).json({
            message: "An error occurred while deleting the student",

        });
    }
};

const restoreStudent = async (req, res) => {
    const rollNo = req.body.rollNo;

    const t = await sequelize.transaction();
    try {
        const student = await Student.findOne({
            where: { rollNo },
            paranoid : false
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await Address.restore({
                where: { addressId: student.addressId },
                transaction: t
        });

        await Student.restore({
            where: { rollNo },
            transaction: t
        });

        await t.commit();

        res.status(200).json({
            message: "Student and associated address restored successfully"
        });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({
            message: "An error occurred while restoring the student",
            error: error.message
        });
    }
};

const deletedStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null,
                }
            },
            paranoid: false
        });
        res.status(200).json({
            message: "Deleted Users",
            students
        });
    } catch (error) {
        res.status(403).json({
            message: "Some error occurred",
            error: error.message
        });
    }
};

const updateStudent = async(req, res)=> {
    try{
        const rollNo = req.body.rollNo
        const {firstName,lastName, phoneNo, email, courseId} = req.body;
        const student = await getStudentDetails(rollNo);
        if(!student) {
            res.status(404).json({
                message : "Student not found"
            })
        }

        const updatedStudent = await Student.update({
            firstName,lastName, phoneNo, email, courseId,
            
        },
        {where : {rollNo}}
    )
        res.status(200).json({
            message : "Student updated succesfully!",
            updatedStudent
        })
    }
    catch(error) {
        res.status(403).json({
            message : "Oops, some error occured",
            error : error.message  
        })
    }
}

module.exports = {insertAll, insert, getDetails, getAll, deleteStudent, restoreStudent, deletedStudents, deletePermanent, updateStudent}