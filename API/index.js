const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
require('dotenv').config

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servers'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

app.use(express.json())

app.listen(PORT,
    () => console.log(`API ready on port ${PORT}`)
    )

app.get('/servers', (req, res) => {
    res.status(200).send({
        penis: 'large',
        swag: 'on'
    })
});

app.post('/servers/:id', (req, res) => {
    const { id } = req.params;
    const { cum } = req.body;

    if(!cum){
        res.status(417).send({message: "I NEED CUM"})
    }

    res.send({
        penis: `One large penis with you ${cum} and penis of ${id}`
    });
});