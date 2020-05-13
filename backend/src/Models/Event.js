
const db = require("../Connection/connect")

const Event = db.sequelize.define( "events", {
    name: {
        type:db.Sequelize.STRING
    },

    data: {
        type: db.Sequelize.STRING
    },

    bestTime: {
        type: db.Sequelize.FLOAT
    },

    price: {
        type: db.Sequelize.FLOAT
    },

    modal: {
        type: db.Sequelize.STRING
    },

    winner: {
        type: db.Sequelize.STRING
    },

    distance: {
        type: db.Sequelize.FLOAT
    },

    pricePool: {
        type: db.Sequelize.FLOAT
    }
} )

Event.sync( { force: true } )

module.exports = Event