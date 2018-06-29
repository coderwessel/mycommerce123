const Router = require('express').Router
const Product = require('./model')

const router = new Router()


router.get('/products', (request, response) => {
  Product.findAll().then(products => {
    response.send({ products })
  })
})



//
// router.get("/products", (req, res) => {
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



router.get("/products/:id", (req, res) => {

  sendResponse(Product.findById(+req.params.id), res)

})



router.post("/products", (req, res) => {

  sendResponse(Product.create(req.body), res)

})



router.put("/products/:id", (req, res) => {

  const updates = req.body

  Product.findById(+req.params.id)

    .then(product => product.update(updates).then(_ => res.send(product)))

    .catch(fail(res))

})



router.delete("/products/:id", (req, res) => {

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








module.exports = router
