const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
let connection = null;

class Database {
    constructor() {
        this.queryResult = null;
    }


    async runQuery(query) {
        // let response = null;
        console.log("INITIALIZING MYSQL2-SSH2 CONNECTION...");
        await sshClient.on('ready', async () => {
            await sshClient.forwardOut(
                '127.0.0.1',  // source address
                12345, // source port
                '127.0.0.1', // destination address
                3306, // destination port
                async (err, stream) => {
                    if (err) throw err;
                    connection = await mysql.createConnection({
                        host: '127.0.0.1',
                        user: 'root',
                        password: 'root',
                        database: 'pms_system',
                        stream: stream
                    });
                    console.log("INITIALIZE MYSQL2-SSH2 CONNECTION SUCCESS");
                    // await this.connection.connect(error => {
                    //     if (error) {
                    //         // reject(error);
                    //         console.log("error: ", error);
                    //         return
                    //     }
                    //     // resolve(this.connection);
                        
                    // });
                    connection.query(query, async (error, results, fields) => {
                        if (error) {
                            return "ERROR: query failed."
                        }
                        // console.log(await results);
                        this.queryResult = results;
                    });
                    
                }
            )
        }).connect({
            host: '192.168.2.219',
            port: 22,
            username: 'carlo',
            password: 'asdfjklh'
        });
    }

    test(){
        return "class function test"
    }


}



module.exports = {
    // db
    Database
};