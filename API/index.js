const express = require('express');
const app = express();
const PORT = 8080;
const db = require("./db/servers")
require('dotenv').config

app.use(express.json())

app.listen(PORT,
    () => console.log(`API ready on port ${PORT}`)
    )

app.get('/servers/:server', async (req, res) => {
    const server = await db.getServers(req.params.server);
    res.status(200).json({server});
});

app.get('/servers', async (req,res) =>{
    const server = await db.getAllServers();
    res.status(200).json({server})
})

app.patch("/servers/:server", async (req, res) => {
    const server = await db.updateServer(req.params.server, req.body);
    res.status(200).json({server});
    return;
})

app.post('/servers', async (req, res) => {
    const results = await db.createServer(req.body);
    res.status(201).json({id: results[0]});
});