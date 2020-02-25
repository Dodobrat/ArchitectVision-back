const mysql = require('promise-mysql');
const info = require('../config');

exports.addNote = async (data) => {
    try{
        const connection = await mysql.createConnection(info.config);
        const sql = `INSERT INTO notes SET ?`;
        await connection.query(sql, data);
        await connection.end();
        return {msg: "Note added!"};
    }catch (err) {
        console.log(err);
    }
};

exports.getNote = async (id) => {
    try {
        let data;
        const connection = await mysql.createConnection(info.config);
        const sql = `SELECT * FROM notes WHERE id=${id}`;
        data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

exports.getRoomNotes = async (id) => {
    try {
        let data;
        const connection = await mysql.createConnection(info.config);
        const sql = `SELECT * FROM notes WHERE roomId=${id}`;
        data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

exports.updateNote = async (id,data) => {
    try{
        const connection = await mysql.createConnection(info.config);
        const dbCheck = `SELECT * FROM notes WHERE id=${id}`;
        const checkId = await connection.query(dbCheck);
        let sql;
        if (checkId[0]) {
            sql = `UPDATE notes SET ? WHERE id=${id}`;
            await connection.query(sql, data);
        }
        await connection.query(sql, data);
        await connection.end();
        return {msg: "Note updated!"};
    }catch (err) {
        console.log(err);
    }
};

exports.deleteNote = async (id) => {
    try{
        const connection = await mysql.createConnection(info.config);
        const sql = `DELETE FROM notes WHERE id=${id}`;
        await connection.query(sql);
        await connection.end();
        return {msg: "Note deleted!"};
    }catch (err) {
        console.log(err);
    }
};
