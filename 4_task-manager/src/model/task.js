//steps to create model for mongoose
//1. load mongoose 
//2. load validator package
//3. create model, type and constraints
//4. create a schema and middleware
//5. export it

const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true})

taskSchema.pre("save", async function(next) {
    const task = this;
   
    if(task.isModified("description")) {
        const taskdescription = task.description.charAt(0).toUpperCase() + task.description.slice(1);
        task.description = taskdescription;
    }
    next();
})
const Task = mongoose.model("Tasks",taskSchema);

module.exports = Task;