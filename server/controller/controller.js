const { response } = require('express')
const User = require('../database/users')

async function registerUser(req,res){
    try{
        const {fullName,email,password,userName} = req.body

        let user = await User.findOne({
            email: email
        })

        if(user){
            return res.status(403).send({
                message: 'User already registered with this email'
            })
        }
        user = await User.create({
            fullName,email,password,userName,avatar
        })

        return response.send({
            message: 'Registration successful'
        })
    }

    catch(err){
        return res.status(404).send({
            error : err.message
        })
    }
}

module.exports = {registerUser}