const expressJwt = require('express-jwt')

var authJwt = function (){
     const api =process.env.API_URL
    
    return expressJwt({
        secret:'hotelBooking',
        algorithms: ['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url:/\/api\/v1\/hotels(.*)/,method:['GET','OPTIONS']},
             '/api/v1/users/login',
            '/api/v1/users/register',
            '/api/v1/hotels/:id'

        ]
    })
}
 async function isRevoked (req,payload,done) {
    if (!payload.isAdmin){
        done(null,true)
    }
    done()
 }

module.exports = {authJwt}