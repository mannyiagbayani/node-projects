# NodeJS projects

A collection of NodeJS projects

## Installation

run "npm init"

## Usage
NODE-APP/NOTE APP

A simple tool to add / delete / read / list all messages stored in json file. It's using YARG package
   

```
node app.js --help
node app.js add --title="nodejs" --description="nodejs sample"
node app.js read --title="nodejs" 
node app.js list 
node app.js delete --title="nodejs"
```

WEATHER APP

Use to get the temperature of a location. It's using REQUEST package, Mapbox API and DarkSky API for Geozoning.

```
node app.js Auckland New Zealand
```

WEBSERVER APP

A front-end implementation of Weather App with Heroku configuration.
Check it here: 

```
https://manny-weather-app.herokuapp.com/

```

TASK MANAGER APP
An API to create / delete / update task integrated with authentication. 

- create user endpoint
```
//POST
https://manny-task-manager-api.herokuapp.com/users
```
- create user payload

```
{
	"name":"User 1",
	"age": 20,
	"email":"user1@example.com",
	"password": "user1-pa$sword"
}
```

- login user endpoint
```
//POST
https://manny-task-manager-api.herokuapp.com/users
```
- login user payload

```
{
	"email":"user1@example.com",
	"password": "user1-pa$sword"
}
```
- read user endpoint
```
//GET
https://manny-task-manager-api.herokuapp.com/users/me
```
- create user task endpoint
```
//POST
https://manny-task-manager-api.herokuapp.com/tasks
```
- create task payload

```
{
	"description": "buy lotto tickets",
	"completed" : false
}
```

- read user task endpoint
```
//GET
https://manny-task-manager-api.herokuapp.com/tasks?sortBy=createdAt:asc
```
