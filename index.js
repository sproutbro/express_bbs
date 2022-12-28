const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
require("dotenv").config({path:'.env'})

const Test = require("./models/Test")

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Connected to database successfully")
    }
})

app.use(express.static('public'))

app.get("*", (req, res) => {
    res.sendFile(path.join("index.html"))
})

app.post("/write", (req, res) => {
    let test = new Test(req.body)
    test.save((err, suc) => {
        if(err) {
            return console.log(err)
        }
        res.json(suc)
    })
})

app.post("/read", (req, res) => {
    Test.find({}, (err, data) => {
        if(err) {return console.log(err)}
        res.json(data)
    });
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))