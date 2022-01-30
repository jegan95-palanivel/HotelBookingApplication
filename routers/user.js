const {User}=require("../models/user")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register

router.post('/register',async (req,res)=>{
    

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10) ,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
        street:req.body.street

})
    const users = await user.save()

    if(!users)
    return res.status(500).send('The user cannot be created')

    res.send(users)
    
})

//Login

router.post('/login',async(req,res)=>{
    
    const user = await User.findOne({email:req.body.email})
    const secret = process.env.SECRETE
    if(!user){
        return res.status(400).send('Email is wrong')
    }
    if(user&& bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token = jwt.sign(
            {
                userId:user.id,
                isAdmin:user.isAdmin
            },
            secret,{expiresIn:'1d'}
            )
        res.status(200).send({user:user.email,token:token})
    }else{
        res.status(400).send('password is wrong')
    }
    return res.status(200).send(user)
})


module.exports=router