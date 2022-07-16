const router = require('express').Router();
const ProfileInfo = require('../models/Profile');


// CREATE Profile Info
router.post('/', async (req, res) => {
    const newPost = new ProfileInfo(req.body);
    console.log('from adding info')
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE Profile Info
router.patch('/:id', async (req, res) => {
    try {
        const post = await ProfileInfo.findById(req.params.id);
        await ProfileInfo.updateOne({
            $set: req.body
        })
        res.status(200).json("the profile info was updated");
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET Pofile info
router.get('/:id', async (req, res) => {
    try {
        const pInfo = await ProfileInfo.find({
            userId: id
        })
        console.log('from profile')
        res.status(200).json(pInfo)

    } catch (error) {
        res.status(500).json('Profile Info was not found');
    }
})

module.exports = router;