const mongoose = require('mongoose');
const moment = require('moment')
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    users: {
        type: Array,
        default: []
    },
    courseModules: [
        {
            title: {
                type: String,
                trim: true
            },
            description: {
                type: String,
                trim: true
            }
        }
    ]
});
courseSchema.virtual('progress').get(function () {
    const date = new Date();
    if (date.getTime() >= this.endDate.getTime()) {
        return 'Closed';
    }
    else if (date.getTime() < this.startDate.getTime()) {
        return 'Upcoming';
    }
    else {
        return 'Ongoing';
    }
})
courseSchema.methods.toJSON = function () {
    const course = this;
    const courseObject = course.toObject();
    courseObject.startDate = moment(courseObject.startDate).format('YYYY MM DD');
    courseObject.endDate = moment(courseObject.endDate).format('YYYY MM DD');
    courseObject.progress = course.progress
    return courseObject
};
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;