const { response } = require('express')
const User = require('../database/users')
const jwt = require('jsonwebtoken')

const JSW_SECRET_KEY = 'sldjflkdsjldsg' 
//console

function generateToken(user){
    const {_id,name,email} = user
    return jwt.sign({
        _id,name,email
    },JSW_SECRET_KEY)
}

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

async function logIn(req,res){
    try{
        const {userName, password} = req.body

        const user = await User.findOne({
            userName
        })

        if(!user){
            return res.status(403).send({
                message: "User with this userName does not exist",
            })
        }
        if(user.password !== password){
            return res.status(403).send({
                message: 'Wrong password'
            })
        }

        const token = generateToken(user)
        const{_id, fullName} = user;

        return res.send({
            message: "Login successful",
            data:{
                token,
                user:{
                    _id,fullName,
                }
            }
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function checkLoggedIn(req,res){
    try{
        const user = req.user;
        // console.log(user)
        return res.send({
            data: user
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {registerUser,logIn,checkLoggedIn}