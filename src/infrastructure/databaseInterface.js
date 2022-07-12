class DatabaseInterface {
    constructor() {
        if(!this.insert) {
            throw new Error("Database's must have insert function!");
        }
    }
}
module.exports.DatabaseInterface = DatabaseInterface;
