const Buys = require("../Models/Buys")
const Player = require("../Models/Player")
const paypal = require("paypal-rest-sdk")
const paypalConfig = require("../../config/paypal.json")
paypal.configure(paypalConfig)

async function findAndPayPlayer(email) {

    let coinsForPay = 0
    
    let player = await Player.findAll({
        where: {
            email
        }
    })

    if(player[0].status == "100 coins"){
        coinsForPay = 100
    }else if(player[0].status == "150 coins"){
        coinsForPay = 150
    }else{
        coinsForPay = 200
    }

    await Player.update({
        coins: player[0].coins + parseFloat(coinsForPay)
    }, {
        where: {
            email
        }
    })

    await Player.update({
        status: "Novo Player"
    }, {
        where: {
            email
        }
    })

}

module.exports = {

    async Finish(req, res) {

    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId

    let pgmnt = await Buys.findAll({
        where: {
            paymentId: paymentId
        }
    })

    console.log(pgmnt)

    findAndPayPlayer(pgmnt[0].playerEmail)

    let valor = {
        "currency": "BRL",
        "total": pgmnt[0].price
    }

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": valor
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
        if(err){
            console.warn(err.response)
            throw err;
        }else{
            console.log("Pagamento realizado com sucesso")
            //return res.json({message:"foi"})
            res.json({ message: "show" })
            

        }
    })
}

}