const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
//const fs = require('fs')
//const fastcsv = require('fast-csv')
const bcrypt = require('bcrypt')
//const moment = require('moment')
const {onChangeFileHandler} = require('./functions')

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
        const lastName = req.body.lastName
        const firstName = req.body.firstName
        const middleName = req.body.middleName
        const sex = req.body.sex
        const birthday = req.body.birthday
        const address = req.body.address
        const email = req.body.email
        const contactNumber = req.body.contactNumber
        //const photo = onChangeFileHandler(req.body.photo)
        const inputValues = [username, hashedPassword, lastName, firstName, middleName, sex, birthday, address, email, contactNumber]
        db.query('INSERT INTO `users`(`username`, `password`, `lastName`, `firstName`, `middleName`, `sex`, `birthday`, `address`, `email`, `contactNumber`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        inputValues, (err, result) =>{
            if(err){
                console.log(err)
            }else{
                console.log(`Registered User: ${username}, Name: ${lastName}, ${firstName} ${middleName}`)
                res.send({
                        username: username,
                        login: true,
                    })
            }
        })
    }catch{
        res.status(500).send()
    }
})

//Login
app.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(`Requesting Access: ${username}`)
    db.query('SELECT * FROM users', async (err,result) => {
        if(err){
            console.log(err)
        }else{
            const allUsers = result
            const usernames = allUsers.map(user => user.username)
            if(usernames.includes(username)){
                const userRef = allUsers.filter(user => user.username === username)
                try{
                    const login = await bcrypt.compare(password, userRef[0].password)
                    if(login){
                        console.log(`User Login: ${username}`)
                        res.send({
                            username: username,
                            userNumber: userRef[0].userNumber,
                            login: true,
                        })
                    }
                    else{
                        console.log("Access Denied: Invalid Credentials.")
                        res.send({
                            username: '',
                            userNumber: '',
                            login: false,
                    })
                }
                }catch{
                    res.status(400).send("User Not Found.")
                }
            }else{
                console.log("Access Denied: Invalid Credentials.")
                res.send({
                    username: '',
                    role: '',
                    login: false,
                })
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Airport Server for Facial Recognition System is running on port ${port}...`)
})