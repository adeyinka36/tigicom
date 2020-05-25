const express = require('express');
const stripe= require('stripe')("sk_test_EwaBCToz7hMAkHjTVGT2Ya4m00Lo4gr2LJ");
const uuid = require('uuid');
const { Schema}= require('mongoose');
const mongoose=require('mongoose');


// const {products,purchases} = require('../models')

const routes = express.Router();


// stripe payment route 
routes.post('/makepayment',async (req,res)=>{
let quantityPurchased=req.body.product.map(e=>e.quantity)
 quantityPurchased=quantityPurchased.reduce((cur,acc)=>cur+acc)

 const items=req.body.product
 const {}=req.body.product
 let  arrayOfCosts=items.map(item=>Number(item.quantity))
 let  ItemsBought= items.map(e=>e.name)
 arrayOfCosts=items.map(e=>Number(e.cost)*Number(e.quantity))
let  totalCost
totalCost=arrayOfCosts.reduce((accumulator,currentValue)=>{return Number(accumulator)+Number(currentValue)})

  const  thetoken= req.body.token;
  const token={...thetoken}
   const product=Object.create(null)
   product.currency="usd"
   product.amount=totalCost
   
  const unique = uuid();

  
  const id=Object.create(null)
   id.itempotencyKey=unique
  
const detailsOfPurchase={customerName:req.body.firstName,
                         customerEmail:req.body.token.email,
                          amountCharged:arrayOfCosts,
                           quantityPurchased,
                          deliveryStatus:"Pending",
                          deliveryAddress:`${req.body.street} ${req.body.city} ${req.body.postcode}`}
 
return stripe.customers.create({
      email:token.email,
      source:token.id
  }).then(customer=>{
      product.customer=customer.id
      stripe.charges.create(product)
  }).then(result=>{
    //   insert details of purcheses into purchase model
    // purchases.create(detailsOfPurchase)
     

    return res.status(200).json(result)})
  .catch(err=>console.log(`There was an error  :${err}`))
})



// route for getting initial products for database 

routes.get('/getproducts',async (req,res)=>{
  try{
    const db=`mongodb+srv://adeyinka36:Nitrogene2000@cluster0-kni2n.mongodb.net/test?retryWrites=true&w=majority`;
     mongoose.connect(db
        ,{
        useUnifiedTopology: true ,
            useNewUrlParser: true }
            )

  mongoose.connection.on('connected',()=>{console.log("finally we are connected")}).catch(err=>console.log(`there is an error:${err}`))
            
  const productsItems= new Schema({
    name:String,
    description:String,
    stock:Number,
    cost:Number
})
const products= mongoose.model('products',productsItems);


  const items=  await products.find()
    return res.status(200).json(items)
  }catch(err){
      
      console.log(`Error in getproducts routs: ${err}`)
      return res.status(500)
  }

})

module.exports=routes