const express = require('express');

const router = express.Router()
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send('Hillo user');
//
// })
router.post('/signup',(req,res)=>{
    // console.log('testSignup',req.body);
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"please add all the fields"})
    }
    // res.json({message:'Sucessfully Posted'})
    User.findOne({email:email})
        .then((SaveUser)=>{
        if(SaveUser){
            return res.status(503).json({error:'User Already Exist'})
        }
        bcrypt.hash(password,10)
            .then(HashPassword=>{
                const user = new User({
                    email,
                    password:HashPassword,
                    name
                })
                user.save()
                    .then((user)=>{
                        res.json({message:'Sucessfully Posted'})
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })

    })
     .catch((err)=>{
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    console.log('sigin',req.body)
    if(!email || !password){
        return res.status(503).json({message:'Invalid email & password'})
    }
    User.findOne({email:email})
        .then(SaveUser=>{
            if(!SaveUser){
                return res.status(503).json({error:'Invalid email & password'})
            }
            bcrypt.compare(password,SaveUser.password)
                .then((doMatch)=>{
                    if(doMatch){
                          // res.json({message:'Sign in successfully'})
                        const token = jwt.sign({_id:SaveUser._id},JWT_SECRET)
                        const {_id,email,name} = SaveUser
                        res.json({token,user:{_id,email,name}})
                    }
                    else{
                        return res.status(503).json({error:'Invalid email & password'})
                    }
                })
                .catch(err=>{
                    console.log(err)

                })
        })
})

module.exports= router