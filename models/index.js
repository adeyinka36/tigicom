const Sequelize = require('sequelize')
const sequelize= new Sequelize({
    dialect:'sqlite',
    storage:'../data.db',
    logging:true
})



// creating Products model
 
const products= sequelize.define("products",{
    id:{
        type:Sequelize.INTEGER,
        autoInreament:true,
        primaryKey:true,
        
    },
    name:{
        allowNull:false,
        notEmpty:true,
        type:Sequelize.STRING,
        validate: {
            notEmpty:{
              msg:"Please provide a value for  'name'"
            },
            notNull: {
            
              msg: 'Please provide a value for "name"',
           }}
    },
    img:Sequelize.STRING,
    stock:Sequelize.NUMBER,
    cost:Sequelize.NUMBER,
    description:Sequelize.STRING
    

})

// Purcheses model with reference to customer id for each purchase 
const purchases= sequelize.define("purchases",{
    customerName:Sequelize.STRING,
    customerEmail:Sequelize.STRING,
    amountCharged:Sequelize.INTEGER,
    quantityPurchased:{
        type:Sequelize.INTEGER,
        allowNull:false,
        notEmpty:true,
        validate: {
            notEmpty:{
              msg:"Please provide a value for  'Qantity Purchased'"
            },
            notNull: {
            
              msg: 'Please provide a value for "Quantity purchased"',
           }
    }},
    deliveryStatus:Sequelize.STRING,
    deliveryAddress:{
        type:Sequelize.STRING,
        allowNull:false,
        notEmpty:true,
        validate: {
            notEmpty:{
              msg:"Please provide a value for  'Delivery Address'"
            },
            notNull: {
            
              msg: 'Please provide a value for "Delivery Address"'
           }
        }
    
    
    },

})

// adding refernce of product to each purchase
products.hasMany(purchases)
purchases.belongsTo(products,{foreignKey:"productId"}) 


module.exports={sequelize,Sequelize,products,purchases}