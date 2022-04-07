const express = require('express');
const User = require('../models/user');
const router = new express.Router();
router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users).status(200)
})
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user).status(201);
    }
    catch (e) {
        res.sendStatus(401);
    }
});
router.post('/user/courses', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const user = await User.findOne({ name, email })
        if (!user) {
            throw new Error('user does not exist');
        }
        res.send(user.courseEnrolled);
    } catch (error) {
        res.send(error.message).status(400);
    }

})
module.exports = router;