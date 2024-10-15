const {Student, Course, Address} = require("../models");

//To get all the addresses of existing users
const getAllAddresses = () => {
    const addresses =  Address.findAll({
        include : [{
         model : Student,
         attributes : ["rollNo",  "firstName"]
        }]
     })
    return addresses;
}

//To create address;
const createAddress = (address, city , state, pinCode,tran) => {
    const add = Address.create({
        address, city, state, pinCode
    },
    {
        transaction : tran
    }
)
    return add;
}

module.exports = {getAllAddresses, createAddress}