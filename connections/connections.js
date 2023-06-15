const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnection=()=>{
    try{
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Se conectó a la base de datos");
    }
    catch(err){
        console.log("Error con la conexión de la base de datos. ", err);
    }
}