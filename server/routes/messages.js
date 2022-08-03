const router = require('express').Router();
const Message = require('../models/Message');



// GET all messages for a User
router.get('/:id', async (req, res) => {
    const messages = await Message.find({
        userId: req.params.id
    });
    try {
        console.log("All messages for a user are", messages);
        res.status(200).json(messages);
    } catch (error) {
        console.log("An error was occured", err);
        res.status(500).json(err);
    }
})

// GET messages for a friend
router.post('/:id', async (req, res) => {
    try {
        console.log('inside server getting chat messages', req.params.id);
        const messages = await Message.findOne({
            userId: req.params.id,
            friendId: req.body.friendId
        })
        console.log('messages from message', messages.messages);
        res.status(200).json(messages.messages);
    } catch (error) {
        return res.status(500).json({
            "error was occured": error
        })
    }
})


// UPDATE messages and create a new message

router.patch('/:id', async (req, res) => {
    const isMessagesExists = await Message.find({
        userId: req.params.id,
        friendId: req.body.friendId
    });
    console.log("req from patch messages ", req.body)
    console.log("the messages between user and friend are: ", isMessagesExists)
    try {
        if (isMessagesExists.length > 0) {
            const message = await Message.findOneAndUpdate({
                userId: req.params.id,
                friendId: req.body.friendId
            }, {
                $push: {
                    messages: req.body.message
                }
            })
            console.log('the message to add is', req.body.message);
            res.status(200).json(message.messages);
        } else {
            const newMessage = await Message(req.body);
            const savedMessage = await newMessage.save();
            await Message.findOneAndUpdate({
                _id: savedMessage._id
            }, {
                $push: {
                    messages: req.body.message
                }
            });
            console.log('from messages back, not exist')
            res.status(200).json(savedMessage);
        }
    } catch (error) {
        res.status(500).json({
            "error was occured": error
        })
    }
})

module.exports = router;