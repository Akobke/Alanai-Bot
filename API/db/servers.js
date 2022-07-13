const knex = require('./knex');

function createServer(server){
    return knex("queues").insert(server)
}

function getAllServers(){
    return knex("queues").select("*");
}

function getServers(server){
    return knex.select("*").from("queues").where("server", server).orderBy('id', 'asc');
}

function deleteServer(server){
    return knex.select("*").from("queues").where("server", server).del();
}

function deleteAllServers(server){
    return knex("queues").where("server", server).del();
}

function deleteAllServers(server){
    return knex("queues").where("server", server).del();
}

function updateServer(server, queue){
    return knex("queues").where("server", server).update(queue);
}

function deleteFirstSong(server, queue){
    return knex("queues").where("server", server).first().del()
}

module.exports = {
    createServer,
    getAllServers,
    deleteServer,
    updateServer,
    getServers,
    deleteFirstSong
}