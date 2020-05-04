
const Event = require("../Models/Event")
const Player = require("../Models/Player")

module.exports = {

    async Store(req, res) {

        const { name, data, price, distance, pricePool } = req.query

        let event = await Event.create({
            name,
            data,
            price,
            distance,
            pricePool
        })

        return res.json( event )

    },

    async Index(req, res) {

        let players = await Player.findAll()

        return res.json( players )
        
    },

    async findEvent(req, res) {

        let event = await Event.findAll()

        return res.json( event )

    },

    async payEvent(req, res) {

        const { pay, email, event } = req.query
        let updatedPlayer

        let player = await Player.findAll({
            where: {
                email
            }
        })

        if(parseInt(player[0].coins) >= parseInt(pay)){
            updatedPlayer = await Player.update({
                coins: parseInt(player[0].coins - pay),
                event
            }, {
                where: {
                    email
                }
            })
        }

        return res.json( updatedPlayer )

    },

    async winner(req, res) {

        const { email, time, today, eventName } = req.query

        let eventData = await Event.findAll({
            data: today,
            name: eventName
        })

        if(eventData[0].winner){
            if( parseInt(eventData[0].bestTime) > parseInt(time) && eventData[0].data === today){
                eventData = await Event.update({
                    winner: email,
                    bestTime: time
                }, {
                    where: {
                        name: eventName
                    }
                })
            }else{
                eventData = {
                    message: "Você não conseguiu ser o primeiro"
                }
            }
        }else{
            eventData = await Event.update({
                winner: email,
                bestTime: time
            }, {
                where: {
                    name: eventName
                }
            })
        }

        res.json(eventData)

    },

    async finalizeEvent(req, res) {

        const {event} = req.query

        let eventList = await Event.findAll({
            id:event
        })

        const datas = {
            "name": eventList[0].name,
            "distance": eventList[0].distance
        }

        let winner = eventList[0].winner

        let playerWinner = await Player.findAll({
            email: eventList[0].winner
        })

        playerWinner = await Player.update({
            eventCoins: parseInt(playerWinner[0].eventCoins) + parseInt(eventList[0].pricePool)
        }, {
            where: {
                email: eventList[0].winner
            }
        })

        await Player.update({
            event: ""
        }, {
            where: {
                event: JSON.stringify(datas)
            }
        })

        Event.destroy({
            where: {
                id:event
            }
        })

        return res.json({player: winner})

    }

}
