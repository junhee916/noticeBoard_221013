const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const useController = {};

useController.getAll = async (req, res) => {
    try{
        if(res.locals.user){
            const users = await userModel.find()
            res.status(200).json({
                msg : "get users",
                count : users.length,
                usersData : users
            })
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.get = async (req, res) => {
    const id = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findById(id);
            if(!user){
                return res.status(400).json({
                    msg: "not userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get user",
                    userData : user
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({
                msg : "user email, please other email"
            })
        }
        else{
            const user = new userModel({
                name, email, password
            })
            await user.save()
            res.status(200).json({
                msg : "success signup",
                userData : user
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                msg : "user email, please other email"
            })
        }
        else{
            const payload = {
                id: user._id,
                email: user.email
            }
            const token = jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn : '1h'
                }    
            )
            res.status(200).json({
                msg : "success login",
                token : token,
                userData : user
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.update = async (req, res) => {
    const id = req.params.userId;
    try{
        if(res.locals.user){
            const user = await userModel.findByIdAndUpdate(id, {$set : {
                            name : req.body.name,
                            email : req.body.email
                        }});
            if(!user){
                return res.status(400).json({
                    msg : "not userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update user by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.deleteAll = async (req, res) => {
    try{
        if(res.locals.user){
            await userModel.remove()
            res.status(200).json({
                msg: "delete users"
            })
        }
        else{
            res.status(400).json({
                msg: "not token"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};
useController.delete = async (req, res) => {
    const id = req.params.userId;

    try{    
        if(res.locals.user){
            const user = await userModel.findByIdAndRemove(id);
            if(!user){
                return res.status(400).json({
                    msg : "not userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete user by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(error){
        res.status(500).json({
            msg : error.message
        })
    }
};

module.exports = useController;