const {Hotel} = require  ('../models/hotel')
const express = require('express')
const router = express.Router();


//Get Hotel List

router.get('/',async (req,res)=>{
const hotelList = await Hotel.find();

if(!hotelList){
    res.status(500).json({success:false})
}
res.status(200).send(hotelList)

})

//Add Hotel


router.post('/add',async (req,res)=>{
    
const hotel =  new Hotel({
        roomtype:req.body.roomtype,
        numberOfGuest:req.body.numberOfGuest,
        name:req.body.name,
        email:req.body.email,
        personalDetails:req.body.personalDetails

})
    const hotels = await hotel.save()

    if(!hotels)
    return res.status(500).send('The hotel cannot be created')

    res.send(hotels)
    
})




//Get Hotel by ID

router.get('/:id',async(req,res)=>{
    const hotel = await Hotel.findById(req.params.id)
    if(!hotel){
        return res.status(500).json({success:true,message:'The hotel with the given ID was not found'})
    }

    res.status(200).send(hotel)
   
})


//Update Hotel

router.put('/:id', async(req,res)=>{
    const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
    
    {
             name:req.body.name,
             
    },
    {new:true}
)

if(hotel){
    return res.status(400).json({success:true,message:'the hotel name can be updated!'})
}
        
        res.send(hotel)
})

module.exports=router
