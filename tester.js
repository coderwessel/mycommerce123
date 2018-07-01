// 1. Install dependencies: yarn add mocha chai chai-http
// 2. Copy scripts below to tester.js
// 3. Run script: ./node_modules/.bin/mocha tester.js

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const host = 'http://localhost:4001'
const emailA = 'bob@example.com'
const passwordA = 'alice'
const emailB = 'alice@example.com'
const passwordB = 'bob'

var userIdA
var userIdB
var jwt
var productId

describe('Ecommerce REST API', () => {

  it('GET /products/ returns 200 OK', done => {
    chai.request(host)
      .get('/products/')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('GET /products returns an envelope', done => {
    chai.request(host)
      .get('/products')
      .end(function(err, res) {
        const body = res.body
        expect(body).to.have.property('products')
        done()
      })
  })

  it('GET /secret returns a 401 error if not logged in ', done => {
    chai.request(host)
      .get('/secret')
      .end(function(err, res) {
        expect(res).to.have.status(401)
        done()
      })
  })


  it('POST /logins with correct login returns a JWT key', done => {
    chai.request(host)
      .post('/logins')
      // .set('content-type', 'application/x-www-form-urlencoded')
      .send({email: emailA,
            password: passwordA})
      .end(function(err, res) {
        const body = res.body
        expect(body).to.have.property('jwt')
        jwt=body.jwt
        done()
      })
  })

  it('GET /secret returns 200  status whith proper jwt key ', done => {
    console.log(`Bearer ${jwt}`)
    chai.request(host)
      .get('/secret')
      // .set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${jwt}`)
      .end(function(err, res) {
        console.log(res.body.message)
        expect(res).to.have.status(200)
        done()
      })
  })

  it('POST /products with correct login and payload creates a product and returns a product id', done => {
    chai.request(host)
      .post('/products')
      .set('Authorization', `Bearer ${jwt}`)
      // .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: "test product",
            price: 5,
          description: "mocha tester yeah!!"})
      .end(function(err, res) {
        const body = res.body
        expect(body).to.have.property('id')
        productId=body.id
        console.log(productId)
        done()
      })
  })

  it('PUT /products with correct login and payload modifies a product', done => {
    chai.request(host)
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${jwt}`)
      // .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: "test product modified",
            price: 6
        })
      .end(function(err, res) {
        const body = res.body
        expect(body).to.deep.equal({
                id: productId,
                name: 'test product modified',
                price: 6,
                description: 'mocha tester yeah!!',
                image: null,
                userId: 1
              })
       done()
      })
  })

  it('GET products/id returns correct product for new product ', done => {
      chai.request(host)
        .get(`/products/${productId}`)
        .end(function(err, res) {
          body = res.body
          expect(body.price).to.equal(6)
          done()
        })
    })

  it('DELETE /products/id with correct login and payload deletes a product', done => {
    chai.request(host)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${jwt}`)
      // .set('content-type', 'application/x-www-form-urlencoded')
      .end(function(err, res) {
        expect(res).to.have.status(200)
       done()
      })
  })

  it('GET products/id returns 404 after deletion of new product ', done => {
      chai.request(host)
        .get(`/products/${productId}`)
        .end(function(err, res) {
          expect(res).to.have.status(404)
          done()
        })
    })




  it('return 404 for /randomurl + random number', done => {
    chai.request(host)
      .get('/randomurl' + Math.random())
      .end(function(err, res) {
        expect(res).to.have.status(404)
        done()
      })
  })



//end tests
})


//huh
