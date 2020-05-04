
const db = require("../Connection/connect")

const Buys = db.sequelize.define("buys", {

    playerEmail: {
        type: db.Sequelize.STRING
    },

    paymentId: {
        type: db.Sequelize.STRING
    },

    price: {
        type: db.Sequelize.STRING
    },

    buys: {
        type: db.Sequelize.TEXT
    }
})

//Buys.sync({ force: true })

module.exports = Buys