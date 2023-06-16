const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");

exports.getAllUsers = (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({error:err.message}));
};

exports.createUser =  (req, res) => {
    const {username, email,password} = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash){
        if(err){
            res.status(500).json({error:err.message});
        }
        else{
            const newUser = new userModel({
                username,
                email,
                password:hash,
                picture:""
            });

            newUser
            .save()
            .then(() => res.status(201).json({success:"created"}))
            .catch(err => res.status(500).json({error:err.message}));
        }
    });
}

// exports.updateUser = (req, res) => {
//     const {id}= req.params;
//     const { username, email, password } = req.body;
//     userModel.findByIdAndUpdate( id , { username, email, password }, {new:true})
//     .then(user => {
//         if(!user)throw new Error(`user with ID ${id} not found`);
//         res.status(200).json({user});
//     })
//     .catch(err => res.status(404).json({error:err.message}));
// }

exports.updateUser = (req, res) => {
    const {id}= req.params;
    const {username, email,password, role} = req.body;
    const avatarFile = req.file;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function(err, hash){
        if(err){
            res.status(500).json({error:err.message});
        }
        else {
            const updateData = {
                username,
                email,
                password:hash,
                role
            };
            if(avatarFile){
                const picturePath = `uploads/${avatarFile.filename}`;
                updateData.picture = picturePath;
                fs.renameSync(avatarFile.path, picturePath)
            }
            
            userModel.findByIdAndUpdate( id, updateData, {new:true})
            .then(user => {
                if(!user)throw new Error(`user with ID ${id} not found`);
                res.status(200).json({user});
            })
            .catch(err => res.status(404).json({error:err.message}));
        }
            
    });
}

exports.deleteUser = (req, res) => {
    const {id}= req.params;

    if(req.user.role !== "admin"){
        return res.status(401).json({error: "Unauthorized access."});
    }

    userModel.findByIdAndDelete(id)
    .then(user => {
        if(!user)throw new Error(`user with ID ${id} not found`);
        res.status(200).json({message:"User deleted"});
    })
    .catch(err => res.status(404).json({error:err.message}));
}

exports.getUser = (req, res) => {
    const {email}= req.params;
    userModel.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        const imagePath = user.picture
        if(!imagePath){
            return res.status(404).json({ error: 'Image not found' });
        }
        fs.readFile(imagePath,(err,data)=>{
            if (err) {
                return res.status(500).json({ error: 'Failed to read image file' });
            }
        })
        data.json(data);
    })
    .catch(err => res.status(404).json({error:err.message}));
}