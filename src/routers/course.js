const Course = require('../models/course');
const express = require('express');
const router = new express.Router();
const User = require('../models/user');
router.post('/enrol', async (req, res) => {
    try {
        const info = req.body;
        if (!info.enrolledDate) {
            throw new Error("enrollment date should be there");
        }
        const user = await User.findOne({ name: info.name });
        if (!user) {
            return res.send('user does not exist');
        }
        const course = await Course.findOne({ title: info.title });
        if (!course) {
            return res.send('course does not exist');
        }
        const enroldate = new Date(info.enrolledDate);
        if (enroldate.getTime() <= course.startDate.getTime()) {
            user.courseEnrolled.push(course.title);
            await user.save()
            course.users.push(user.name);
            await course.save()
            return res.send('enrolled in course').status(201);
        }
        else {
            throw new Error('Enrollment date is over');
        }

    }
    catch (e) {
        res.send(e.message).status(400)
    }
})

router.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.send(courses).status(200);
})
router.post('/courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.send(course).status(201);
    }
    catch (e) {
        res.sendStatus(400);
    }
})
router.post('/course/users', async (req, res) => {
    try {
        const title = req.body.title;
        const course = await Course.findOne({ title });
        if (!course) {
            throw new Error('course does not exist');
        }
        res.send(course.users);
    }
    catch (e) {
        res.send(e.message).status(400);
    }
})
module.exports = router;