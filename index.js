
const express = require("express")

const cors = require("cors")

const body = require("body-parser")

// const Product = require("./product")

const productsRouter = require('./products/router')

const app = express()

app.use(cors())

app.use(body())

app.use(productsRouter)

app.listen(4001, () => console.log("Express API listening on port 4001"))
