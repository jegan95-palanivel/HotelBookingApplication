const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose')
const hotelRoutes = require("./routers/hotel")
const userRoutes =require("./routers/user")
const cors= require('cors')
const {authJwt} = require('./helpers/jwt');

const {errorHandler} = require('./helpers/error-handler');
const res = require('express/lib/response');
app.use(cors())
app.options('*',cors())


//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)

//env Config
require('dotenv/config')

//API_URL
const api = process.env.API_URL

//Routers

app.use(`${api}/hotels`,hotelRoutes)
app.use(`${api}/users`,userRoutes)






//PORT
const port = process.env.PORT || 3000

//Database Connection
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Database Connection is Ready...')
}).catch((err)=>{
    console.log(err)
})

app.listen(port, () => console.log(`The Server is connected on port ${port}`))