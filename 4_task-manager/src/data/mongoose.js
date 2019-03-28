// ----- How To
// 1. create a reference of mongoose
// 2. create a connection using mongoose.connect




const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB, 
    {
        useNewUrlParser: true,
        useCreateIndex: true
        
    }
);

