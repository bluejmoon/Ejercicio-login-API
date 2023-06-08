const mongoose = require("mongoose");

const dbConnection = () => {
    try{mongoose.set("strictQuery", false)
        mongoose.connect(process.env.DB_CONNECTION)
      console.log("Se conecto con base de datos")}
    catch(e){console.log("Error de conexion con la base de datos", err)};
};

// const Uri = "mongodb+srv://admin:<password>@dbusers.d41ttak.mongodb.net/?retryWrites=true&w=majority";

export default {dbConnection};