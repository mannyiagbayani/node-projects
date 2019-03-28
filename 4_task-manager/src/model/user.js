//steps to create model for mongoose
//1. load mongoose 
//2. load validator package
//3. create model, type and constraints
//4. create a schema and middleware
//5. export it

const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Task= require("../model/task");

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("dont use 'password' as your password")
            }
        }

    },
    avatar: {
        type: Buffer
    },

    tokens: [{
        token: {
            required: true,
            type: String
        }
    }]
    }, 
    {
        timestamps:true
    }
);

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    //console.log("manny: " , userObject);
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.virtual("tasks", {
    ref: "Tasks",
    localField: "_id",
    foreignField: "owner"
});

//methods is for instantiation
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_TOKEN_SECRET_KEY,{expiresIn: "1 day"});
    console.log(token)
    
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

//static is for calling directly without instantiating
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error({ error: "Invalid login"});
    }
    
    const isMatch = await bcryptjs.compare(password, user.password);

    if(isMatch) {
        return user
    }
    else 
        return {}
}

userSchema.pre("save", async function(next) {
   const user = this;
    //console.log(user)
    if(user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password,8);
    }
    next();
})

userSchema.pre("remove", async function(next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next()
});
const User = mongoose.model("User", userSchema);


module.exports = User;