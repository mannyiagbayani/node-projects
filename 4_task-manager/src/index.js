//Packages needed
//1. express
//2. mongoose
//3. validator
//4. bcryptjs
//5. nodemon
//6. mongodb
//-------------------------

//steps to create the content of index.js w/c server the routing
//1. load express
//2. load mongoose data. it can be an external file w/c contains creation of mongodb
//3. load userdefined routers => const userRouter = require("../router/user");
//4. instantiate express and create port constant
//5. use express.json() => app.use(express.json())
//6. load userdefined routers => app.use(userRouter);
//7. start listening for connection

const express = require("express");
require("./data/mongoose");
const userRouter = require("../src/router/user");
const taskRouter = require("../src/router/task");


const PORT = process.env.PORT// || 3000;

const app = express();



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})