const express = require('express');
require('dotenv').config();
const privKey=process.env.PRIVSTRIPE;
const sequelize= require('./models').sequelize;
const path= require('path');

const {products,purchases}=require('./models');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const port=process.env.PORT||5000;


const app = express();



app.use(express.json());

app.use(cors());

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use(routes);









app.listen(port,async ()=>{
    try{
        await sequelize.sync({force:true})
        await products.bulkCreate([{
            name:"Brazil",
            img:"../image/blackgirl.jpg",
            cost:"50",
            stock:"20",
            description:"A beautiful type of hair from Brazil"
        },
        {name:"Mexican",
            img:"../image/blackgirl.jpg",
            cost:"50",
            stock:"20",
            description:"A beautiful type of hair from Mexico"},
            {
                name:"Japan",
            img:"../image/blackgirl.jpg",
            cost:"50",
            stock:"20",
            description:"A beautiful type of hair from Japan"
            }])

        console.log(`Listening ${process.env.PRIVSTRIPE}  `)
    }catch(err){
        console.log(`There was this error Syncing with database at App.js ${err}`)
    }
})

module.exports=privKey