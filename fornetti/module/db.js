// MySQL database module.
const mysql = require('mysql');

class DataBase {
    constructor() {        
        this.connection = mysql.createConnection({
            host     : "localhost"  ,
            user     : "fornetti",
            password : "Z18CFxFAw4szBxJF",
            database : "fornetti"
        });
    
        this.connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });
    }

    // Get result.
    getOne(table, options, callBack) {
        let query = `SELECT * FROM ${table} `;
        let wheres = [];
        if (options.where) {
            for (let w of options.where) {
                if (w.flag) {
                    switch(w.flag) {
                        case 'MD5': 
                            wheres.push(`${w.field} = MD5('${w.value}')`);
                            break;
                    }

                } else {
                    wheres.push(`${w.field} = '${w.value}'`);
                }
            }
            query += ` WHERE ${wheres.join(" AND ")}`;
            console.log(query);
        }
        this.connection.query(query, (err, result, fields) => {
            if (err) {
                return callBack(err);
            }
            callBack(null, result);
        });
    }

    list(table, callBack) {
        this.connection.query(`SELECT * FROM ${table}`, (err, result, fields) => {
            if (err) {
                return callBack(err);
            }
            callBack(null, result);
        });
    }
}

module.exports = new DataBase();
