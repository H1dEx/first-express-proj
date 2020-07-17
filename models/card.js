const path = require('path');
const fs = require('fs');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(course) {
        const card = await Card.fetch();
        const index = card.courses.findIndex(el => el.id === course.id);
        const candidate = card.courses[index];
        if (candidate) {
            // already exist
            card.courses[index].count++;
        } else {
            //need to add
            course.count = 1;
            card.courses.push(course);
        }
        card.totalPrice += +course.price
        await Card.setCard(card);
    }

    static async setCard(courses) {
        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(courses), (err)=>{
                if (err) rej(err);
                res();
            })
        })
    }

    static async fetch() {
        return new Promise( (res, rej) => {
            fs.readFile(p, 'utf-8', (err,data) => {
                if (err) rej(err);
                res(JSON.parse(data));
            })
        })
    }

    static async remove(id) {
        return new Promise( async (res, rej) => {
        const card = await Card.fetch();
        const index = card.courses.findIndex(el => el.id === id);
        const course = card.courses[index];
        card.totalPrice -= course.price;
        if (course.count === 1) {
            card.courses = card.courses.filter(el => el.id !== id);
        }  else {
            card.courses[index].count--;
        }
        await Card.setCard(card);
            res(card);
        })
    }
    
}

module.exports = Card;