const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        console.log(authHeader);
        return res.status(400).send({msg : "authentication invalid"}) 
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {userId : payload.userId , name : payload.name}
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth