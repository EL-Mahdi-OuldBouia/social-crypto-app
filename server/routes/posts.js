const router = require("express").Router();
const Post = require('../models/Post');
const User = require('../models/User')


// CREATE A POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A POST
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body
            })
            res.status(200).json("the post was updated");
        } else {
            res.status(403).json("You can only update your posts");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE A POST 
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('The post was deleted');
        } else {
            res.status(403).json('you can only delete your own posts')
        }
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
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET TIMELINE POSTS
router.get('/timeline/:userId', async (req, res) => {
    try {
        console.log('currentUser id', req.params.userId);
        // const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({
            userId: req.params.userId
        });
        // const friendsPosts = await Promise.all(
        //     currentUser.followings.map(friendId => {
        //         Post.find({
        //             userId: friendId
        //         });
        //     })
        // );
        // res.status(200).json(userPosts.concat(...friendsPosts));
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router;