const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// REGISTER a user
router.post('/register', async (req, res) => {

    try {
        let validations = {}
        console.log("request is :", req.body)
        const isUsernameExists = await User.find({
            username: req.body.username,
        })
        if (isUsernameExists.length > 0) {
            validations = {
                ...validations,
                usernameExists: "The username is already taken."
            }
        }
        const isEmailExists = await User.find({
            email: req.body.email
        })
        if (isEmailExists.length > 0) {
            validations = {
                ...validations,
                emailExists: "The email is already signed up with."
            }
            console.log('the validations in the backend', validations);
            return res.status(400).json(validations);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            userId: req.body.userId,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json({
            userId: user._id,
            username: user.username
        });
    } catch (err) {
        res.status(500).json({
            "error was occured": err
        });
    }

})



//Login 
router.post('/login', async (req, res) => {
    try {
        console.log('request body in login', req.body.email)
        const email = req.body.email;
        const user = await User.findOne({
            email: email
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('from error login');
    }
})



module.exports = router;