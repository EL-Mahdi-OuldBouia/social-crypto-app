const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// REGISTER a user
router.post('/register', async (req, res) => {

    try {
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
            userId: user._id
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
        console.log('inside server', user.email);
        (!user && res.status(404).json("User was not found"));
        // const validPassword = await bcrypt.compare(req.body.password, user.password);
        // await console.log('is pass valid', validPassword);
        // (!validPassword && res.status(404).json('wrong password'))

        res.status(200).json({
            userId: user._id
        });
    } catch (err) {
        res.status(500).json('from error login');
    }
})



module.exports = router;