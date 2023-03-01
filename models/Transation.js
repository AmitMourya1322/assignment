const mongoose = require('mongoose');


//sName = sender name
//sEmail = sender email

//rName = receiver name
//rEmail = receiver email

const transactionSchema = new mongoose.Schema({
      sName:{
          type:String,
          require: true
      },
      sEmail:{
          type:String,
          require: true
      },
      rName:{
          type:String,
          require: true
      },
      rEmail:{
          type:String,
          require: true
      },
      amount:{
          type:Number,
          require: true
      },
      date:{
          type: Date,
          default: Date.now
      }
});

const TransactionModel = new mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;