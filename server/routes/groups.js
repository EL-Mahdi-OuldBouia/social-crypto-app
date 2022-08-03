const router = require("express").Router();
const Group = require('../models/Group');
const fs = require('fs');
const multer = require('multer');
const User = require('../models/User');


const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});

// CREATE A NEW GROUP
router.post('/group', upload.single('image'), async (req, res) => {
    let {
        members,
        ...body
    } = req.body;
    try {
        console.log('members: ', req.body.members.split(','))
        if (req.file) {
            const img = fs.readFileSync('./uploads/' + req.file.originalname)

            body = {
                ...body,
                groupPicture: {
                    data: img
                },
                members: members.split(',')
            }
        }
        const newGroup = Group(body);
        console.log('new group id: ', newGroup.id)
        await newGroup.save();

        await Promise.all(
            members.split(',').map(member =>
                User.findByIdAndUpdate(
                    member, {
                        $push: {
                            groups: newGroup.id
                        }
                    }
                )
            )
        );
        res.status(200).json(newGroup)

    } catch (error) {
        console.log('An error was occured while creating the user', error);
        res.status(500).json(error);
    }
})


// GET A SINGLE GROUP
router.get('/group/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        res.status(200).json(group)
    } catch (error) {
        console.log("an error was occured while getting goup", err);
        res.status(500).json(error)
    }
})

// GET GROUPS FOR A SINGLE USER
router.get('/groups/:id', async (req, res) => {
    try {
        const groups = await Group.find({
            admin: req.params.id
        });
        res.status(200).json(groups);
    } catch (error) {
        console.log('An error was occured in getting all created groups for a single user:', error);
        res.status(500).json(error);
    }
})

// UPDATE A GROUP
router.patch('/group/:id', async (req, res) => {
    try {
        await Group.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(500).json('the group was successfully updated');

    } catch (error) {
        console.log('an error occured while updating the group', error);
        res.status(500).json(error)
    }
})

module.exports = router;