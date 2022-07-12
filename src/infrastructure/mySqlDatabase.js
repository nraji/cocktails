const mysql = require("mysql");
const {DatabaseInterface} = require("./DatabaseInterface");

class MySqlDatabase extends DatabaseInterface {
    #dbConnection = null;
    #host;
    #user;
    #password;
    constructor(
        host,
        user,
        password
    ) {
        super();
        this.#host = host;
        this.#user = user;
        this.#password = password;
    }

    async #connect() {
        this.#dbConnection = mysql.createConnection({
            host: this.#host,
            user: this.#user,
            password: this.#password
        });
        this.#dbConnection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    async insert(query) {
        if (this.#dbConnection === null) {
            await this.#connect();
        }
        await this.#dbConnection.insert(query);
    }
}

module.exports.MySqlDatabase = MySqlDatabase;
