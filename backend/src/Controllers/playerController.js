
const Player = require("../Models/Player")

module.exports = {
    async Store(req, res) {
        
        const { name, email, password, age, ip, animals, principalAnimal } = req.query

        let usuario = await Player.findAll({
            where: {
                email
            }
        })

        if(!usuario[0]){
            usuario = await Player.create({
                name,
                email,
                password,
                ip,
                animals,
                principalAnimal,
                age,
                coins:0,
                eventCoins:0,
                anCoins:0,
                status:"Novo Player"
            })
        }else{
            if(usuario[0].ip !== ip){
                await Player.update({
                    ip
                }, {
                    where: {
                        email
                    }
                })
            }
        }
        
        return res.json(usuario)

    },

    async FindMe(req, res) {

        const { ip } = req.query

        const user = await Player.findAll({
            where:{
                ip
            }
        })

        res.json( user )

    },

    async setAnimal(req, res){

        const { email, animal } = req.query

        let player = await Player.update({
            principalAnimal: animal
        }, {
            where: {
                email
            }
        })

        return res.json(player)

    }
    
}