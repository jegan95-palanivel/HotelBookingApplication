const mongoose = require('mongoose')


const hotelSchema = new mongoose.Schema({
roomtype:{
    type:String,
    required:true
},
numberOfGuest:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true  
},
personalDetails:{
    type:String,
    required:true
}

})


exports.Hotel=mongoose.model('Hotel-Booking',hotelSchema)