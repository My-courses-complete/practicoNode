const mysql = require('mysql')

const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconf)

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log('DB connected');
        }
    })
    
    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection()
        }  else {
            throw err
        }
    })
}

handleConnection()

function list(table) {
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM  ${table}`, (err, data) => {
            if (err) return reject(error)
            resolve(data)

        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM  ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err)
            resolve(result)

        })
    })
}
function update(table, data) {
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table}  SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err)
            resolve(result)

        })
    })
}

const upsert = async (table, data) => {
    /*»»»HELP ME«««*/

    // if (data && data.id) {
    //     return insert(table, data);
    // } else {
    //     return update(table, data);
    // }
    let row = []

    if (row.push(get(table, data.id)).lenght === 0) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

// function upsert(table, data) {
//     data && data.id ? update(table, data) :  insert(table, data) 
// }


function query(table, query, join) {
    let joinQuery = ''
    if (join) {
        const key = Object.keys(join)[0]
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`,query,(err, res) => {
            if(err) return reject(err)
            resolve(res[0] || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}