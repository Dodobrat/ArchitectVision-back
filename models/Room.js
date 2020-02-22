const mysql = require('promise-mysql');
const info = require('../config');

exports.addRoom = async (data) => {
  try{
      const connection = await mysql.createConnection(info.config);
      const sql = `INSERT INTO rooms SET ?`;
      await connection.query(sql, data);
      await connection.end();
      return {msg: "Room created!"};
  }catch (err) {
      console.log(err);
  }
};

exports.getRooms = async () => {
    try {
        let data;
        const connection = await mysql.createConnection(info.config);
        const sql = 'SELECT * FROM rooms';
        data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

exports.getRoom = async (id) => {
    try {
        let data;
        const connection = await mysql.createConnection(info.config);
        const sql = `SELECT * FROM rooms WHERE id=${id}`;
        data = await connection.query(sql);
        await connection.end();
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

exports.updateRoom = async (id,data) => {
    try{
        const connection = await mysql.createConnection(info.config);
        const dbCheck = `SELECT * FROM rooms WHERE id=${id}`;
        const checkId = await connection.query(dbCheck);
        let sql;
        if (checkId[0]) {
            sql = `UPDATE rooms SET ? WHERE id=${id}`;
            await connection.query(sql, data);
        }
        await connection.query(sql, data);
        await connection.end();
        return {msg: "Room updated!"};
    }catch (err) {
        console.log(err);
    }
};
