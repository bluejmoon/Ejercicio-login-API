const userSchema = new mongoose.Schema({

    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    picture: {type:String}
});

module.exports = mongoose.model('Usuarios', userSchema);
