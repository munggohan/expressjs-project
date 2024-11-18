const mysql = require('mysql2');

let connection = null;

class Database {
    constructor() {
        this.queryResult = null;
    }
    async runQuery(query) {
        console.log("QUERY: ", query);
        try {
            connection = await mysql.createConnection({
                // host: '127.0.0.1',
                host: 'localhost:3306',
                // host: '192.168.2.219',
                user: 'root',
                password: 'root',
                database: 'pms_system',
                // stream: stream
            });
            console.log("INITIALIZE MYSQL2-SSH2 CONNECTION SUCCESS");
            // let [result, fields] = await connection.query(query);
            // this.queryResult = result;
            connection.query(query, async (error, results, fields) => {
                if (error) {
                    return "ERROR: query failed."
                }
                console.log("running query: ", query);
                this.queryResult = results;
            });
        } catch (err) {
            this.queryResult = "ERROR: " + err;
        }
    }
}


module.exports = {
    // db
    Database
};