
const express = require("express")
const routes = express.Router()

const playerController = require("./src/Controllers/playerController")
const eventController = require("./src/Controllers/eventContoller")
const paymentController = require("./src/Controllers/paymentController")
const successController = require("./src/Controllers/successController")
const withdrawController = require("./src/Controllers/withdrawController")
const StoreController = require("./src/Controllers/StoreController")

//Rotas relacionadas ao player
routes.post("/cad", playerController.Store)
routes.get("/players", eventController.Index)
routes.get("/findMe", playerController.FindMe)
routes.get("/setAnimal", playerController.setAnimal)
routes.get("/recept", playerController.Recept)

//Rotas relacionadasaos eventos
routes.post("/newEvent", eventController.Store)
routes.get("/findEvent", eventController.findEvent)
routes.get("/finalizeEvent", eventController.finalizeEvent)
routes.get("/payEvent", eventController.payEvent)
routes.get("/winner", eventController.winner)

//Rotas relacionadas ao PayPal e rotas de pagamento
routes.post("/payment", paymentController.Payment)
routes.get("/findPayData", paymentController.payData)
routes.get("/withdraw", withdrawController.Store)
routes.get("/pay", withdrawController.Pay)
routes.get("/findWithdraws", withdrawController.Index)
routes.get("/apagar", withdrawController.Apagar)

//Sucesso ao comprar
routes.get("/success", successController.Finish)

//Compra cancelada
routes.get("/cancel", (req, res) => {
    res.json({ message: "Cancelado" })
})

//Rotas relacionadas ao painel do administrador
routes.get("/admin", (req, res) => {
    res.sendFile(`${__dirname}/src/AdminPainel/index.html`)
})

//Rotas relacionadas a loja
routes.get("/newItem", StoreController.SaveItem)
routes.get("/destroyItem", StoreController.DestroyItem)
routes.get("/findAn", StoreController.Find)
routes.get("/playerBought", StoreController.Payment)

module.exports = routes