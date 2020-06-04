
const express = require("express")
const createGame = require("./vqjd/src/scripts/vqjdState")
const socketio = require("socket.io")

const app = express()
const http = require("http")
const bodyParser = require("body-parser")
const routes = require("./routes")

app.use(express.static("vqjd"))

const game = createGame()
console.log(game.state)

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

const server = http.createServer(app)
const sockets = socketio(server)

server.listen(3000, () => {
    console.log("Rodando em http://localhost:3000")
})