const Router = require('express').Router
const Product = require('./model')

const router = new Router()

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}




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



router.post('/products', requireUser, (req, res) => {
  const product = req.body
	product.userId = req.user.id

  Product.create(product).then(entity => {
    res.status(201).send(entity)
  })
})



router.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body

  console.log(`The user that's editting this product has ID = ${req.user.id}`)

  Product.findById(req.params.id)
    .then(entity => {
      if (entity.userId !== req.user.id) {
        res.status(403).send({
          message: 'You\'re not allowed to edit this product!'
        })
      }
      else {
        return entity.update(updates)
      }
    })
    .then(final => {
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})



router.delete("/products/:id", requireUser, (req, res) => {

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
