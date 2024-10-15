const express = require("express");
const { insertAll, insert,getAll,getDetails, deleteStudent, restoreStudent, deletedStudents, deletePermanent, updateStudent} = require("../controller/student");
// const { studentValidator, addressValidator, rollNoValidator, idValidator, updateIdValidator } = require("../middlewares/validations");
const { idSchema, studentSchema, addressSchema, studentaddressSchema } = require("../validations/joi");
const router = express.Router();
const validateBody = require("../middlewares/validator")

//To get all the students in record 
router.get("/getall",getAll)

//Get every details about student including course and address through his rollNo
router.get("/get/:rollNo",validateBody(idSchema), getDetails);

//To insert all data of a student at once 
router.post("/insert",validateBody(studentaddressSchema),insertAll)

//To inserta new student, without address and stuff 
// router.post("/",studentValidator, insert)
router.put("/update", validateBody(idSchema), validateBody(studentSchema), updateStudent);
router.delete("/softdelete/:rollNo", validateBody(idSchema), deleteStudent) 
router.put("/restore", restoreStudent) 
router.get("/getdeleted/", deletedStudents)


//permanent delete
router.delete("/delete", validateBody(idSchema), deletePermanent)

module.exports = router