const mysql = require('promise-mysql');
const info = require('../config');

exports.createTables = async () => {
    try {
        const connection = await mysql.createConnection(info.config);
        // create users table
        let sql = `CREATE TABLE rooms (
                    id INT NOT NULL AUTO_INCREMENT,
                    title VARCHAR(255),
                    model VARCHAR(255),
                    createdAt DATETIME,
                    PRIMARY KEY (id)
                    )`;

        await connection.query(sql);
        // create login history table
        sql = `CREATE TABLE notes (
                id INT NOT NULL AUTO_INCREMENT,
                roomId INT,
                title VARCHAR(255),
                description TEXT,
                createdAt DATETIME,
                PRIMARY KEY (id),
                FOREIGN KEY (roomId) REFERENCES rooms(id)
                )`;

        await connection.query(sql);

        await connection.end();
    } catch (err) {
        console.log(err);
    }
};
