const express = require('express');
const app = express();
const PORT = 8080;
const db = require("./db/servers")
require('dotenv').config

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

app.post('/servers', async (req, res) => {
    const results = await db.createServer(req.body);
    res.status(201).json({id: results[0]});
});