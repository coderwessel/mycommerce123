const jwt = require('jsonwebtoken')



const secret = 'jkbhdfgjbhfgdbhj'



function sign(userId) {

  return jwt.sign(

    {

      data: {

        id: userId

      }

    },

    secret,

    { expiresIn: 3600 * 3 }

  )

}



function verify(token, callback) {

  jwt.verify(token, secret, callback)

}



module.exports = { sign, verify }
