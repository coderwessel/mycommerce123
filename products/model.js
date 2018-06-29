Sequelize = require('sequelize')
require ('../db')
var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')


export default Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})

module.exports = Product
