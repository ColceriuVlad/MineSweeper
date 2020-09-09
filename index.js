const express = require("express")
const app = express()
const port = process.env.PORT || 3000
require("dotenv").config()
app.listen(`${port}`, function () {
    console.log(`${port}`)
})
app.use(express.static("public"))
app.use(express.json())
const MongoClient = require("mongodb").MongoClient
const uri = process.env.uri_key;
let clients = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// query the database, sort it by clicks in an ascending manner and send it back to the client where it is logged into the Winner menu
app.get("/winnerquery", function (request, response) {
    clients.connect(error => {
        if (error) {
            console.error(error)
        }
        minesweeperdb = clients.db("minesweeperdb")
        minesweeperdb.collection("scores").find({}).sort({
            clicks: 1
        }).toArray(function (error, element) {
            if (error) {
                console.error(error)
            }
            response.json(element)
        })

    })
})


//recieves the current winner from client side, adds it to the database and sends it back to be included in the Winner section
app.post("/winner", function (request, response) {
    clients.connect(error => {
        if (error) {
            console.error(error)
        }
        minesweeperdb = clients.db("minesweeperdb")
        minesweeperdb.collection("scores").insertOne(request.body)
    })
    response.json(request.body)

})