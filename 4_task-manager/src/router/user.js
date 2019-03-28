//steps in creating a router using express
//1. load express
//2. load model
//3. create a router => const router = new express.Router()
//4. configure the endpoints
//5. export the router => module.exports = router


const express = require("express");
const User = require("../model/user");
const auth = require("../middleware/authentication");
const Multer = require("multer");
const Sharp = require("sharp");
const {sendWelcomeEmail, sendCancellationEmail} = require("../emails/account");


const router = new express.Router();
const upload = new Multer({
   // dest: "avatar",
    limits: {
        fileSize: 1000000
    },
    fileFilter(request, file, cb) {
        console.log(file.originalname.endsWith("png"))
        if(!file.originalname.endsWith("png")) {
           return  cb(new Error("This file is not allowed"))
        }
        return cb(undefined, true)
    }
});

router.get("/users/:id/avatar",  async(request, response) => {

        try {
            const user = await User.findById(request.params.id);
            if(!user || !user.avatar) {
                return response.status(404).send()
            }

            response.set("Content-Type","image/png")
            response.send(user.avatar)

        } catch (error) {
            response.send(404).send({error: "this is an error"})
        }
}) 

router.delete("/users/me/avatar", auth,async (request, response) => {

    try {
        request.user.avatar = null;
        await request.user.save()
        response.send()
    } catch(error) {
        response.status(400).send()
    }
})

router.post("/users/me/avatar", upload.single("avatar"), auth, async (request, response) => 
{
    const buffer = await Sharp(request.file.buffer).png().resize({width: 200, height: 200}).toBuffer();

    request.user.avatar = buffer;
    await request.user.save();   
    response.send()

},(error,request,response,next) => {
    response.status(400).send({error:error.message})
});

//--configure Login
router.post("/users/login",async (request,response) => {
    try {
        //console.log(request.body)
        const authUser = await User.findByCredentials(request.body.email, request.body.password);
        console.log(authUser)
        if(!authUser) return response.status(400).send({"error":"unable to login"})

       
        const token = await authUser.generateAuthToken();
        response.send({authUser, token});

    } catch(error) {
        console.log(error)
        response.status(500).send({"error":"unable to login"});
    }
})

//--configure POST for users
router.post("/users", async (request, response) => {
    const user = new User(request.body);
  
    try {
      await user.save();
      //todo: send confirmation here
      sendWelcomeEmail(user.name,user.email);
      const token = await user.generateAuthToken();

      response.send({
          user,
          token
      })
    } catch(error) {
      response.status(400).send(error)
    }
})
  
router.post("/users/logout", auth, async (request, response) => {
      try {
          console.log(request.user)
          console.log(request.token)
          request.user.tokens = request.user.tokens.filter((token) => {
             return token.token != request.token;
         })

        await request.user.save();
        response.send();

      }  catch(error) {         
        response.status(500).send();
      }
})

router.post("/users/logoutAll", auth, async (request, response) => {
      try {
        request.user.tokens = [];
        await request.user.save();
        response.send();
      } catch(error) {
        console.log(error)
        response.status(500).send();
      }
})
  //-configure GET for users
  // /users/
router.get("/users/me", auth, async (request,response) => {
    response.send(request.user)    
});
  
//-configure GET for singleuser
// router.get("/users/:id", async (request,response) => {
  
//     try {
//         const user = await User.findById(request.params.id)
//         return response.status(201).send(user);
//     } catch (error) {
//         response.status(500).send(error)
//     }

// })

  //--configure PATCH
  router.patch("/users/me",auth, async (request,response) => {
      const updateFields = Object.keys(request.body);
      const validFields = ["name","age","email","password"];
      const isValid = updateFields.every(field => validFields.includes(field));
  
      if(!isValid) return response.status(400).send({ error: "invalid updates"})
  
      try {

          
          updateFields.forEach(field => request.user[field] = request.body[field]);
          request.user.save();
          response.send(request.user);
      } catch (error) {
          return response.status(400).send();
      }
  })
  
  //configure DELETE
  router.delete("/users/me",auth, async (request, response) => {
      try {
        //console.log(request.user)
        await request.user.remove();
        sendCancellationEmail(request.user.name,request.user.email)
        response.send(request.user)
      } catch(error) {
          response.status(500).send();
      }

    //   try {
    //       const user = await User.findByIdAndDelete(request.params.id);
    //       if(!user) return response.status(400).send();
  
    //       return response.send(user);
    //   } catch(error) {
    //       return response.status(500).send();
    //   }
  })


  module.exports = router;