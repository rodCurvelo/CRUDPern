// Connecting db with server
// importing pool (for query) | pg library
const Pool = require("pg").Pool;

//Creating variable for using poll
const poll = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5432",
    database: "perntodo"
});

// allowing exportation to index.js 
module.exports = poll;