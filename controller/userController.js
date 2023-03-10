
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')


//Registration 
router.post('/',[check('name','Name is required')
.not()
.isEmpty(),
check('email','Please include a valid email').isEmail(),
check(
    'password',
    'Please enter a password with 6 or more characters'
).isLength({min:6})],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password} = req.body;
   try{
    let user = await User.findOne({email});
    if(user){
        res.status(400).json({errors:[{msg:'User already exists'}]})
    }
   

    user = new User({
        name,email,password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();

    const payload ={
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,"secretkey",{expiresIn:360000}
    ,(err,token)=>{
        if(err) throw err;
        res.json({token});
    })

   }catch(err){
    console.log(err)

   }
})


//get user information
router.get('/',async (req,res)=>{
    try{
        const user  = await User.find().select('-password')
        User.countDocuments({ TAccount: '0' }, (err, count) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Number of customers with checking accounts: ${count}`);
            }
          });

          User.countDocuments({ TAccount: '1' }, (err, count) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Number of customers with Saving accounts: ${count}`);
            }
          });
       // await User.findById(req.user.id).select('-password')
        res.json(user,);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')

    }

}
)


//login

router.post('/login',[check('email','Please include a valid email')
.isEmail(),
check(
    'password',
    'password is requried'
).exists()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
   try{
    let user = await User.findOne({email});
    if(!user){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(400).json({errors:[{msg:'Invalid credentials'}]})
    }
   
    const payload ={
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,"secretkey",{expiresIn:360000}
    ,(err,token)=>{
        if(err) throw err;
        res.json({token});
    })

   }catch(err){
    console.log(err)

   }

})

module.exports = router