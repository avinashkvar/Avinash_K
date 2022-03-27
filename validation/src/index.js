const express = require("express")

const app = express();

const usersController = require("./controllers/user.controllers")

app.use(express.json())

app.use("/users",usersController)

module.exports=app;



