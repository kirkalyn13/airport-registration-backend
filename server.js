const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
//const fs = require('fs')
//const fastcsv = require('fast-csv')
//const bcrypt = require('bcrypt')
//const cron = require('node-cron')
//const moment = require('moment')

const app = express()
const port = process.env.PORT || 3005

app.use(cors())
app.use(express.json({limit: '50mb'}))

//Connect to SQL Database
const db = mysql.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'airportdb',
    dateStrings: 'date'

})

//Add User
app.post('/createuser', async (req, res) => {
    try{
        const username = req.body.username
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const role = req.body.role
        const inputValues = [username, hashedPassword, role]
        db.query('INSERT INTO userTable (`username`, `password`, `role`) VALUES (?, ?, ?)', 
        inputValues, (err, result) =>{
            if(err){
                console.log(err)
            }else{
                res.send(`Added User: ${username}, with ${role} privileges.`)
            }
        })
    }catch{
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`Airport Server for Facial Recognition System is running on port ${port}...`)
})