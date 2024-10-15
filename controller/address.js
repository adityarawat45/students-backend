const { createAddress, getAllAddresses } = require("../modular/address")

const getAll = async (req, res)=> {
    try {
        const addresses = await getAllAddresses();
        res.status(200).json({
            addresses
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            message : "Some error occured",
            error : error.message
        })
    }
}

const insert = async (req,res)=> {
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const pinCode = req.body.pinCode
    try {
        const add = await createAddress(address, city, state, pinCode)
        res.status(201).json({
            message : "Address created succesfully",
            id : add.addressId
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            message : "Some error occured",
            error : error.message
        })
    }
}
const deleteAddress = async(req,res)=> {
    
}

module.exports = {getAll,insert,deleteAddress}