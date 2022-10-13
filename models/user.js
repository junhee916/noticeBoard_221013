const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const modelSchema = mongoose.Schema(
    {
        name : {
            type : String
        },
        email : {
            type : String,
            required : true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            unique: true
        },
        password : {
            type : String,
            required: true
        }
    },
    {
        timestamps : true
    }
)

modelSchema.pre('save', async (next) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    }
    catch(error){
        next(error)
    }
})

module.exports = mongoose.model('user', modelSchema);