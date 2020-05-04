
const Sequelize = require("sequelize")

const sequelize = new Sequelize("HandB", "root", "", {
    host: 3306,
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}