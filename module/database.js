

var MongoClient = require('mongodb').MongoClient;

getConnection = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017', (error, client) => {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log('Database connection created');
                resolve(client.db('Taskmanagement'));
            }
        });
    });
}

module.exports = {
    getConnection
}