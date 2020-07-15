const {Router} = require('express');
const Course = require('../models/course');
const router = Router();
router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add a new course',
        isAdd: true
    });
})

router.post('/', async (req, res) => {
    const course = new Course({title, price, img}=req.body)
    await course.save();
    res.redirect('/courses');
})

module.exports = router;