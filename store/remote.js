const request = require('request')
const bodyParser = require('body-parser')

function createRemoteDB(host, port) {
    const URL  = 'http://'+host+':'+port

    const list = (table) => {
        return req('GET', table)
    }

    const req = (method, table, data) => {
        let url = URL + '/' + table
        body = '';

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message)
                }

                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }

    return {
        list
    }
}

module.exports = createRemoteDB;