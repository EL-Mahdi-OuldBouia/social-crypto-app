const router = require("express").Router();
const Post = require('../models/Post');
const User = require('../models/User')
const multer = require('multer');
const fs = require('fs');


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

// CREATE A POST
router.post('/', upload.single('image'), async (req, res) => {
    data = {
        ...req.body,
        image: (req.file ? fs.readFileSync('./uploads/' + req.file.filename) : []),
    }
    const newPost = new Post(data);
    // console.log("new post", newPost);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A POST
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        let {
            change,
            ...toAdd
        } = req.body;
        if (change === "like") {

            const isAlreadyLiking = post.likes.filter(like => like.userId === req.body.userId);
            if (isAlreadyLiking.length > 0) {
                change = "dislike"
            }
        }
        switch (change) {
            case "comment":
                await post.updateOne({
                    $push: {
                        comments: toAdd
                    }
                })
                return res.status(200).json("the post was updated");
            case "like":
                await post.updateOne({
                    $push: {
                        likes: toAdd
                    }
                })
                console.log("liked")
                return res.status(200).json({
                    success: true
                });
            case "dislike":
                await post.updateOne({
                    $pull: {
                        likes: toAdd
                    }
                })
                console.log('disliked')
                return res.status(200).json({
                    success: true
                });
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE A POST 
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        console.log('post was deleted');
        res.status(200).json('The post was deleted');
    } catch (error) {
        res.status(500).json(error);
    }
})
// LIKE A POST
router.patch('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(red.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("The post was liked")
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            })
            res.status(200).json('You have alredy unliked this post')
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET A POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log('getting posts from backed');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET TIMELINE POSTS
router.get('/timeline/:userId', async (req, res) => {
    try {
        const userPosts = await Post.find({
            userId: req.params.userId
        });
        const currentUser = await User.findById(req.params.userId);
        const friendsPosts = await Promise.all(
            currentUser.friends.map(friendId =>
                Post.find({
                    userId: friendId
                })
            )
        );
        // console.log('friendsPosts', friendsPosts);
        res.status(200).json(userPosts.concat(...friendsPosts));
        // res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router;