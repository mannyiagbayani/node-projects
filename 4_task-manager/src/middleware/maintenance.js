const maintenance = async(request,response,next) => {
   
        return response.status(503).send({error: "API is in maintenance mode"})

}

module.exports = maintenance;