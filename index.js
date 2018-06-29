// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
//
// app.listen(4001, () => console.log('Express API listening on port 4001'))
//
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
//
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
//   next()
// })
//
var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

const Product = sequelize.define('product', {
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
//
// app.get('/products', (request, response) => {
//   Product.findAll().then(products => {
//     response.send({ products })
//   })
// })
//
// app.get('/products/:id', (request, response) => {
//   console.log(request.params.id)
//   const productId = request.params.id
//   Product.findById(productId)
//   .then(product => {
//     product && response.send(product)
//     !product && response.status(404).send('Not found')
//   })
//   .catch(() =>//response.status(404)        // HTTP status 404: NotFound
//    response.status(404).send('Not found'))
// })
//
// app.post('/products', (req, res) => {
//   const product = req.body
//   console.log(product)
//   // ... insert the new data into our database
//   Product.create(product)
//   .then(entity => res.status(201).send(entity))
//
//   // res.end()
// })
//
// app.put('/products/:id', (req, res) => {
//   const productId = Number(req.params.id)
//   const updates = req.body
//   Product.findById(productId)
//   .then(
//     (product) => {
//       console.log(product)
//       Product.update(
//       req.body
//       , {
//         where: { id: product.id },
//         returning: true,
//         plain: true
//       })
//       .then(function (result) {
//         console.log(result)
//         res.status(200).sendStatus(result)
//       })
//       .catch(function (err){
//         res.status(500).send(err)
//       })
//     })
// })
//
// app.delete('/products/:id', (req, res) => {
//
//   const productId = Number(req.params.id)
//   const updates = req.body
//   Product.findById(productId)
//   .then(
//     (product) => {
//       console.log(`Deleting ${product.id}`)
//       !product && res.status(500).send('product not found')
//       product && Product.destroy(
//       {
//         where: { id: product.id },
//         returning: true,
//         plain: true
//       })
//       .then(function (result) {
//         console.log(`deletion succes: ${result}`)
//         result && res.status(200).sendStatus(result)
//       })
//       .catch(function (err){
//         console.log('error caught!')
//         res.status(500).send(err)
//       })
//     })
// })


// good version

const express = require("express")

const cors = require("cors")

const body = require("body-parser")

// const Product = require("./product")



const app = express()



app.use(cors())

app.use(body())


app.get('/products', (request, response) => {
  Product.findAll().then(products => {
    response.send({ products })
  })
})



//
// app.get("/products", (req, res) => {
//
//   sendResponse(
//
//     Product.findAll({
//
//       attributes: ["id", "name", "price"]
//
//     }),
//
//     res
//
//   )
//
// })



app.get("/products/:id", (req, res) => {

  sendResponse(Product.findById(+req.params.id), res)

})



app.post("/products", (req, res) => {

  sendResponse(Product.create(req.body), res)

})



app.put("/products/:id", (req, res) => {

  const updates = req.body

  Product.findById(+req.params.id)

    .then(product => product.update(updates).then(_ => res.send(product)))

    .catch(fail(res))

})



app.delete("/products/:id", (req, res) => {

  Product.findById(+req.params.id)

    .then(product => {

      if (product) {

        return product.destroy().then(_ => res.end())

      }

      res.status(404).end()

    })

    .catch(fail(res))

})



const sendResponse = (promise, res) => {

  promise

    .then(result => {

      if (result) {

        res.send(result)

      } else {

        res.status(404).end()

      }

    })

    .catch(fail(res))

}



const fail = res => err => {

  console.error(err)

  res.status(500).send(JSON.stringify(err))

}



app.listen(4001, () => console.log("Express API listening on port 4001"))
