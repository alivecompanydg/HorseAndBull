
const db = require("../Connection/connect")

const Withdraw = db.sequelize.define("withdraws", {
    
    playerEmail: {
        type: db.Sequelize.STRING
    },

    playerPaypal: {
        type: db.Sequelize.STRING
    },

    withdrawValue: {
        type: db.Sequelize.FLOAT
    }

})

//Withdraw.sync({ force: true })

module.exports = Withdraw