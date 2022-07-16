const router = require('express').Router();

const Message = require('../models/Message');


// CREATE NEW MESSAGE
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body);
    console.log('from create message');
    try {
        const savedMessage = newMessage.save();
        res.status(200).json({
            "success": "the message was added"
        })
    } catch (error) {
        return res.status(500).json({
            "error was occured": error
        })
    }
})


// GET messages for a friend
router.post('/:id', async (req, res) => {
    try {
        const messages = await Message.find({
            userId: req.params.id,
            friendId: req.data.friendId
        })
        console.log('messages from message', messages);
        res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({
            "error was occured": error
        })
    }
})


// UPDATE messages
router.patch('/:id', async (req, res) => {
    try {
        const messages = await Message.findOneAndUpdate({
            userId: req.params.id,
            friendId: req.body.friendId
        }, {
            $push: {
                message: red.body
            }
        })
    } catch (error) {
        res.status(500).json({
            "error was occured": error
        })
    }
})