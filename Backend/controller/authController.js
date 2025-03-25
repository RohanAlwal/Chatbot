const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    const {username, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    try{
        const user = new User({username, password : hashedPass})
        await user.save();
        res.status(201).json({message : "User Created! "});
    } catch(err){
        res.status(400).json({error : 'err'});
    }
}

const login = async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) res.status(404).json({error : "User not Found!"});
    const isMatch = await bcrypt.compare(password, hashedPass);
    if(!isMatch) res.status(401).json({error : "Invalid Credentials! "});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({username, token});
}

module.exports = {register, login};