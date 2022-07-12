const mysql = require("mysql");
const {DatabaseInterface} = require("./DatabaseInterface");

class FileDatabase extends DatabaseInterface {
    #filePath;
    constructor(
        filePath
    ) {
        super();
        this.#filePath = filePath;
    }

    async insert(query) {

    }
}

module.exports.FileDatabase = FileDatabase;
