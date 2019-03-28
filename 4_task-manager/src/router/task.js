//steps in creating a router using express
//1. load express
//2. load model
//3. create a router => const router = new express.Router()
//4. configure the endpoints
//5. export the router => module.exports = router

const express = require("express");
const Task = require("../model/task");
const auth = require("../middleware/authentication")
const router = new express.Router();

//-configure POST for task
router.post("/tasks", auth, async (request, response) => {
    const task = new Task({
        ...request.body,
        owner: request.user._id
    });
    

    try {
        await task.save();
        response.status(201).send(task);
      } catch(error) {
        response.status(400).send(error)
    } 
    
})

//-configure GET for single task
router.get("/tasks/:id", auth, async (request,response) => {
    try {
        const owner = request.user._id;
        const id = request.params.id; 
        const task = await Task.findOne({_id: id, owner: owner})
       
        if(!task) return response.status(400).send();

         return response.status(201).send(task);
    } catch (error) {
        response.status(500).send(error)
    }
})

//-configure GET for tasks
// /tasks/
// /tasks?completed=true!false
router.get("/tasks",auth, async (request,response) => {
    try {
         const match = {}
         if(request.query.completed) {
            match.completed = request.query.completed === "true" ;
         }
        
         
         const sort ={}
         if(request.query.sortBy) {
            const parts = request.query.sortBy.split(":");
            sort[parts[0]] = (parts[1] === "desc" ? -1 : 1)
         }

         await request.user.populate({
             path: "tasks",
             match,
             options: {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip),
                sort
             }
            
         }).execPopulate();
         response.status(201).send(request.user.tasks);
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
});

//configure PATCH
router.patch("/tasks/:id", auth, async (request, response) => {
    const updateFields = Object.keys(request.body);
    const validFields =  ["description","completed"];
    const isValid = updateFields.every(field => validFields.includes(field));

    if(!isValid) return response.status(400).send({error: "Invalid updaets"});

    const owner = request.user._id;
    const id = request.params.id; 

    try {
        const task = await Task.findOne({_id: id, owner})

        if(!task) return response.status(404).send();
        updateFields.forEach(field => task[field] = request.body[field])
        task.save();
        
        response.send(task);
    } catch(error) {
        //console.log(error)
        return response.status(400).send(error);
    }
})

router.delete("/tasks/:id", async (request,response) => {
    try {
        const task = await Task.findByIdAndDelete(request.params.id);
        if(!task) return response.status(400).send();

        return response.send(task);
    } catch(error) {
        return response.status(500).send();
    }
})

module.exports = router;