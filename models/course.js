const {v4} = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.title = title,
            this.price = price,
            this.img = img,
            this.id = v4()
    }

    toJSON() {
        return ({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        })
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());
        return await Course.setAll(courses);
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join('__dirname', '..', 'data', 'courses.json'), 'utf-8', (err, data) => {
                    if (err) rej(err);
                    res(JSON.parse(data));
                }
            )
        })
    }

    static setAll(courses) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
                if (err) reject(err);
                resolve()
            })
        })
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return (courses.find(el => el.id === id));
    }

    static async update(course) {
        const courses = await Course.getAll();
        const index = courses.findIndex(el=> el.id === course.id);
        courses[index] = course;
        await Course.setAll(courses);
    }
}

module.exports = Course;