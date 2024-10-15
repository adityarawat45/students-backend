const fs = require("fs");
// const emailPattern = require("./validations/regex");

const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{1,10}/g

fs.readFile("file.txt", "utf8", function(err,data){
    if(err) {
        console.log("Error occured")
    }
    const emails = data.match(emailPattern)
    console.log(emails)
})