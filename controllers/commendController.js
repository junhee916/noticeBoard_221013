const commendModel = require('../models/commend');
const commendController = {};

commendController.get = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.user){
            const commend = await commendModel.findById(id)
                                                .populate('user', ['email'])
                                                .populate('board', ['board']);
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendData : commend
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
commendController.save = async (req, res) => {
    const board = req.params.boardId;
    const newCommend = new commendModel({
        user : res.locals.user.id,
        board : board,
        commend : req.body.commend
    })
    try{
        if(res.locals.user){
            await newCommend.save()
            res.status(200).json({
                msg : "save commend"
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
commendController.update = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                                user : res.locals.user.id,
                                commend: req.body.commend
                            }});
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                return res.status(200).json({
                    msg : "update commend by id: " + id
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
        return res.status(500).json({
            msg : error.message
        })
    }
};
commendController.delete = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id);
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
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
        return res.status(500).json({
            msg : error.message
        })
    }
};

module.exports = commendController;