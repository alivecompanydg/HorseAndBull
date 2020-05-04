
const Player = require("../Models/Player")
const Buys = require("../Models/Buys")
const paypal = require("paypal-rest-sdk")
const paypalConfig = require("../../config/paypal.json")
const { products } = require("../../config/products.json")

paypal.configure(paypalConfig)

async function changeStatus(email, itemId) {

        let coinsBuyed = 0

        if(itemId == 1){
            coinsBuyed = 100
        }else if(itemId == 2) {
            coinsBuyed = 150
        }else{
            coinsBuyed = 200
        }

        await Player.update({
            status: `${coinsBuyed} coins`
        }, {
            where: {
                email
            }
        })

    }

module.exports = {
    
    async Payment(req, res) {
        
        const { email, productId } = req.query

        let product = products.reduce((all, item) => item.id.toString() === productId ? item : all, {})
        
        if(!product.id){
            return res.json({ message: "algo deu errado" })
        }

        const cart = [{
            "name": product.title,
            "sku": product.id,
            "price": product.price.toFixed(2),
            "currency": "BRL",
            "quantity": 1
        }]

        const valor = {
            "currency": "BRL",
            "total": product.price.toFixed(2)
        }

        const { description } = product

        const json_pagamento = {
            "intent":"sale",
            "payer": { payment_method: "paypal" },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": { "items": cart },
                "amount": valor,
                "description": description
            }]
        }

        paypal.payment.create(json_pagamento, (err, payment) => {
            if(err) {
                console.warn(err)
            }else{

                Buys.create({
                    playerEmail:email,
                    paymentId: payment.id,
                    price: payment.transactions[0].amount.total,
                    buys: JSON.stringify(payment)
                })

                changeStatus(email, productId)

                payment.links.forEach( (link) => {
                    if(link.rel === "approval_url"){
                        return res.redirect(link.href)
                    }
                } )
            }
        })

    },

    async payData(req, res) {

        let { email } = req.query

        let payment = await Buys.findAll({
            where: {
                playerEmail:email
            }
        })

        return res.json( payment )

    }

}
