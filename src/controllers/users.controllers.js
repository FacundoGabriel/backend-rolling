const { registerUserDB, loginUserDB } = require("../services/users.services")


const registerUser = async(req, res)=>{
    const { msg, statusCode, error } = await registerUserDB(req.body)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}


const loginUser = async(req, res)=>{
   const { msg, statusCode, error } = await loginUserDB(req.body)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

module.exports = {
    registerUser,
    loginUser
}