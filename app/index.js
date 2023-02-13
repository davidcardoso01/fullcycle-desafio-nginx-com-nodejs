const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = "create table if not exists people (name VARCHAR(200))"
connection.query(createTable)

const sql = "INSERT INTO people(name) values ('DAVID CARDOSO')"
connection.query(sql)


let response = '<h1>Full Cycle Rocks!</h1>';
response += '<br/>';
response += '- Lista de nomes cadastrada no banco de dados:';


connection.query("select * from people", (err, rows) => {
    if (err) throw err

    rows.forEach(row => {
        response += '<br/>'+row.name
    });
})

connection.end()



app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

app.get('/', (req, res) => {
    res.send(response)
})
