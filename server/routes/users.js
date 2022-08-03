const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const {
    findById
} = require("../models/User");
const {
    file
} = require("server/reply");


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})



// UPDATE USER
router.patch('/:id', upload.single('userImage'), async (req, res) => {

    switch (req.body.change) {

        case "profileImage":
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: {
                        profilePicture: {
                            data: fs.readFileSync('./uploads/' + req.file.originalname),
                            contentType: 'image' + path.extname(req.file.originalname).replace('.', '/'),
                        }
                    },
                });
                return res.status(200).json("Account has been updated")
            } catch (error) {
                return res.status(500).json(error)
            }
            case "coverImage":
                try {
                    const user = await User.findByIdAndUpdate(req.params.id, {
                        $set: {
                            coverPicture: {
                                data: fs.readFileSync('./uploads/' + req.file.originalname),
                                contentType: 'image' + path.extname(req.file.originalname).replace('.', '/')
                            }
                        },
                    })
                } catch (error) {
                    return res.status(500).json(err)
                }

    }



})

// SET--UPDATE the cover image
router.patch('coverImage/:id', upload.single('coverImage'), async (req, res) => {
    try {
        const userToUpdate = await User.findOneAndUpdate({
            userId: req.params.id
        }, {
            $set: {
                coverPicture: {
                    data: fs.readFileSync('./uploads/' + uuid + req.file.filename),
                    contentType: 'image' + path.extname(req.file.filename).replace('.', '/')
                }
            }
        })
        res.status(200).json("Cover Image was successfully updated.");
    } catch (error) {
        return res.status(404).json(error)
    }
})

// SET--UPDATE the profile image
router.patch('profileImage/:id', upload.single('profileImage'), async (req, res) => {
    try {
        const userToUpdate = await User.findOneAndUpdate({
            userId: req.params.id
        }, {
            $set: {
                profilePicture: {
                    data: fs.readFileSync('./uploads/' + uuid + req.file.filename),
                    contentType: 'image' + path.extname(req.file.filename).replace('.', '/')
                }
            }
        })
        res.status(200).json("Cover Image was successfully updated.");
    } catch (error) {
        return res.status(404).json(error)
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
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL THE USERS 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/allfriends/:id', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const allFriends = await Promise.all(
            currentUser.friends.map(friendId =>
                User.find({
                    userId: friendId
                })
            )
        );
        const {
            password,
            email,
            createdAt,
            updatedAt,
            __v,
            ...others
        } = allFriends
        res.status(200).json(others)

    } catch (error) {
        res.status(500).json('an error was occured while getting all users')
    }
})

// FOLLOW A USER
router.patch('/:id/addfriend', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await findById(req.params.id);
            const currentUser = await findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        friends: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        friends: req.params.id
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