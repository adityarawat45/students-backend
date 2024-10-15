const express = require("express");
const app = express();
const db = require("./models");
const courseRouter = require("./routes/course")
const studentRouter = require("./routes/student")
const addressRouter = require("./routes/address")
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer")
app.use(express.json());

app.use("/course",  courseRouter)
app.use("/student", studentRouter)
app.use("/address", addressRouter);
app.use("/question",questionRouter)
app.use("/answer", answerRouter);


db.sequelize.sync().then((req)=>{
    app.listen(3000,()=>{
        console.log("Server Active");
    })
})