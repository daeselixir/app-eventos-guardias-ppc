const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");


const register = async (req, res) => {
    res.send('register')
}


const login = async (req, res) => {
    res.send('login')
}


module.exports = {
    register,
    login,
}