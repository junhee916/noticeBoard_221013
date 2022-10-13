const boardModel = require('../models/board');
const boardController = {};

boardController.getAll = async (req, res) => {
    try{
        if(res.locals.user){
            const boards = await boardModel.find()
                                            .populate('user', ['email']);
            res.status(200).json({
                msg : "get boards",
                count : boards.length,
                boardsData : boards
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
boardController.get = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findById(id)
                                            .populate('user', ['email']);
            if(!board){
                return res.status(400).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get board",
                    boardData: board
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
boardController.save = async (req, res) => {
    const {board} = req.body;
    const newBoard = new boardModel({
        user : res.locals.user.id,
        board: board
    })
    try{
        if(res.locals.user){
            await newBoard.save()
            res.status(200).json({
                msg : "save board"
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
boardController.update = async (req, res) => {
    const id = req.params.boardId;
    try{
        if(res.locals.user){
            const board = await boardModel.findByIdAndUpdate(id, {$set : {
                                user : res.locals.user.id,
                                board : req.body.board
                            }});
            if(!board){
                return res.status(400).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update board by id: " + id
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
boardController.deleteAll = async (req, res) => {
    try{
        if(res.locals.user){
            await boardModel.remove()
            res.status(200).json({
                msg : "delete boards"
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
boardController.delete = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findByIdAndRemove(id);
            if(!board){
                return res.status(400).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete board by id: " + id
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

module.exports = boardController;