const knex = require('knex');
//conenction to DB
const connectedKnex = knex({
    client: "sqlite3",
    connection:{
        filename: 'servers.sqlite3'
    }
});

module.exports = connectedKnex;