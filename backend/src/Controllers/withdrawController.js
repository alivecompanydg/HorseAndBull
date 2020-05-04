
const Withdraw = require("../Models/Withdraw")
const Player = require("../Models/Player")

module.exports = {

    async Store(req, res) {

        const { playerEmail, playerPaypal, withdrawValue } = req.query

        let solicitation = await Withdraw.create({
            playerEmail,
            playerPaypal,
            withdrawValue
        })

        return res.json(solicitation)
    },

    async Pay(req, res) {

        const { playerEmail } = req.query

        let withdraw = await Withdraw.findAll({
            where: {
                playerEmail
            }
        })

        let playerInfo = await Player.findAll({
            where: {
                email: playerEmail
            }
        })

        let player = await Player.update({
            eventCoins: parseInt(playerInfo[0].eventCoins) - parseInt(withdraw[0].withdrawValue)
        }, {
            where: {
                email: playerEmail
            }
        })

        await Withdraw.destroy({
            where: {
                playerEmail
            }
        })

        return res.json(player)

    },

    async Index(req, res) {

        let withdraws = await Withdraw.findAll()

        return res.json(withdraws)

    },

    async Apagar(req, res){

        const {playerEmail} = req.query

        let withdraw = await Withdraw.destroy({
            where: {
                playerEmail
            }
        })

        return res.json(withdraw)

    }

}