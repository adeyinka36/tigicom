const express = require('express');
require('dotenv').config();
const privKey=process.env.PRIVSTRIPE;
// const sequelize= require('./models').sequelize;
const path= require('path');

// const {products,purchases}=require('./models');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const port=process.env.PORT||5000;

let myPort


const app = express();



app.use(express.json());

app.use(cors());

app.use(routes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}











app.listen(port,async ()=>{
    try{
     
        const db=`mongodb+srv://adeyinka36:Nitrogene2000@cluster0-kni2n.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(db
        ,{
        useUnifiedTopology: true ,
            useNewUrlParser: true }
            )
        await mongoose.connection

        console.log(`Listening ${port} and connnected to database `)
        // myPort=listener.address().port
        // console.log(myport)
    }catch(err){
        console.log(`There was this error Syncing with database at App.js ${err}`)
    }
})

module.exports=privKey