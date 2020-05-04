
const db = require("../Connection/connect")

const Store = db.sequelize.define("stores", {

    item: {
        type: db.Sequelize.STRING
    },

    salesman: {
        type: db.Sequelize.STRING
    },

    price: {
        type: db.Sequelize.FLOAT
    }

})

//Store.sync({ force: true })

module.exports = Store