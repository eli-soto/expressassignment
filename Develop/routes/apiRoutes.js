const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const writeFileAsync = util.promisify(fs.readFile);
const db = require('../db/db.json');


router.get('/notes', (req, res)=>{
    // fs.readFile('db/db.json', 'utf8', (err, data) => {
    //     if(err) console.log(err);
    //     res.json(JSON.parse(data));
    // })
    writeFileAsync('db/db.json', 'utf8')
    .then(data => res.json(JSON.parse(data)))
    .catch(err => console.log(err))
});


router.post('/notes', ({ body }, res)=>{
    const { title, text } = body;

    const payload = {
        title,
        text,
        id: uuidv4()
    }
    const data = [...db, payload];
    //db.push(payload)

    fs.writeFileAsync('db/db.json', JSON.stringify(data), (err, data) => {
        if(err) console.log(err);
        res.json({ data, message: "Successfully created note"});
    })
});


module.exports = router;