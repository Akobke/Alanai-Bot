const knex = require('./knex');

function createServer(server){
    return knex("queues").insert(server)
}

function getAllServers(){
    return knex("queues").select("*");
}

function deleteServer(server){
    return knex("queues").where("server", server).del();
}

function updateServer(server, queue){
    return knex("queues").where("server", server).update(queue);
}

module.exports = {
    createServer,
    getAllServers,
    deleteServer,
    updateServer
}