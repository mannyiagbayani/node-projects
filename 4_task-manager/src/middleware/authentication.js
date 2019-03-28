const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth =async (request, response, next) => {
    try {
        const token = request.header("Authorization").replace("Bearer ","");
        const decoded = await jwt.verify(token,"mysecrethashisforeverencrypted")
        //console.log(decoded)
        const user = await User.findOne({_id: decoded._id,"tokens.token": token})
        // console.log(user)
        if(!user) return response.status(401).send("Please authenticate");

        request.token = token;
        request.user = user;
        next();
    } catch(error) {
        response.status(401).send("Invalid authentication");

    }
  
}

module.exports = auth;