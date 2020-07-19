const express = require('express');
const handlebars = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const mongoose = require('mongoose');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const hdbrs = require('handlebars');
const User = require('./models/user.js');

const app = express();
const hbs = handlebars.create({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(hdbrs)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use( async (req, res, next) => {
    try {
        const user = await User.findById('5f147b04262bae3ac4c2a9d6');
        req.user = user;
        next();
    } catch(e) {
        console.log(e);
    }
})
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}))
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const URL = `mongodb+srv://superman:bQJ2LhZXOmVQHOgX@cluster0.ktro9.mongodb.net/shop`
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                name: 'defUser',
                email: 'defUser@gm.com',
                cart: {
                    items: []
                }
            })
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`server started on ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()