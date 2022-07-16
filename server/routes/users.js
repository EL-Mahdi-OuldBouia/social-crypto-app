const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
    findById
} = require("../models/User");




// UPDATE USER
router.patch('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }

    } else {
        return res.status(403).json('You can update only your account')
    }
})


// DELETE USER
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }

    } else {
        return res.status(403).json('You can delete only your account');
    }
})

// GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log('from users')
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL THE USERS 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log('from users', users.length)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
})

// FOLLOW A USER
router.patch('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await findById(req.params.id);
            const currentUser = await findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id
                    }
                });
                res.status(200).json('The user was been followed');
            } else {
                res.status(403).json("you are already following this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cannot follow yourself")
    }
})

// UNFOLLOW A USER
router.patch('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (currentUser.followers.includes(req.params.id)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id
                    }
                });
            } else {
                res.status(403).json('You cannot unfollow users who you do not follow');
            }
        } catch (error) {
            res.status(403).json(error)
        }
    } else {
        res.status(500).json('You cannot unfollow yourself');
    }
})
module.exports = router;