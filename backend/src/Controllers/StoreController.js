
const Store = require("../Models/Store")
const Player = require("../Models/Player")

module.exports = {

    async SaveItem(req, res) {

        const { item, salesman, price } = req.query

        let announcement = await Store.create({
            item, salesman, price
        })

        res.json(announcement)

    },

    async Find(req, res) {

        let announcement = await Store.findAll()

        return res.json(announcement)

    },

    async DestroyItem(req, res) {

        const { id } = req.query

        let announcement = await Store.destroy({
            where: {
                id
            }
        })

        res.json(announcement)

    },

    async Payment(req, res){

        const { email, salesman, item, price } = req.query
        let player
        let hara
        let newData

        if(salesman === "HaB"){
            player = await Player.findAll({
                where: {
                    email
                }
            })
            hara = JSON.parse(player[0].animals)
            let Item = JSON.parse(item)
            Item.float = Math.random()
            Item.velocidade = Math.floor(Item.float * Item.velocidadeMaxima)
            hara.horse.push(Item)

            newData = await Player.update({
                animals: JSON.stringify(hara),
                coins: parseFloat(player[0].coins) - parseFloat(price)
            }, {
                where: {
                    email
                }
            })

        }

        //return res.json(hara)
        return res.json(newData)

    }

}
