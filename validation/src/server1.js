const app = require("./index")

const connect = require("./configs/db")

app.listen(5000 , async  (req,res)=>{
    try {
        await connect()
    } catch (error) {
        console.error(error)
    }
    console.log("listening on 5000")
})