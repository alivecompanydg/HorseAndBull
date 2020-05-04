
const db = require("../Connection/connect")

const Player = db.sequelize.define("players", {
    name: {
        type: db.Sequelize.STRING
    },

    email: {
        type: db.Sequelize.STRING
    },

    password: {
        type:db.Sequelize.STRING
    },

    ip: {
        type:db.Sequelize.STRING
    },

    coins: {
        type: db.Sequelize.FLOAT
    },

    eventCoins: {
        type: db.Sequelize.FLOAT
    },

    anCoins: {
        type: db.Sequelize.FLOAT
    },

    age: {
        type: db.Sequelize.INTEGER
    },

    event: {
        type: db.Sequelize.STRING
    },

    animals: {
        type: db.Sequelize.TEXT
    },

    principalAnimal: {
        type: db.Sequelize.TEXT
    },

    position: {
        type: db.Sequelize.INTEGER
    },

    status: {
        type: db.Sequelize.STRING
    },

    items: {
        type: db.Sequelize.STRING
    }
})

//Player.sync( { force: true } )

module.exports = Player