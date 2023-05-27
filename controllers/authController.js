const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");
exports.authenticateUser = (req, res) => {
  const {email,password} = req.body;
  userModel
  .findOne({email})
  .then((user) => {
    if (!user) {
        // si no se encuentra el usuario, se devuelve un mensaje de error.
        return res.status(404).json({error:"user not found"});
    }
    bcrypt.compare(password,user.password,function(err, result){
        if(err){
            res.status(500).json({error:err.message})
        }
        else if(result){
            // si la contraseña coincide, el usuario se autentica exitosamente.
            res.status(200).json({message:"authentication was successful"})
        }
        else{
            // si la contraseña no coincide, se devuelve un mensaje de error.
            res.status(401).json({error:"authentication failed"})
        }
    }
    );
  })
.catch((err)=>res.status(500).json({error:err.message}))
};

