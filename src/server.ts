import express, {Application, Request, Response} from 'express'
import mysql, {Connection, MysqlError} from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app: Application = express()
const port: number | string = process.env.PORT || 3005

app.use(cors())
app.use(express.json({limit: '50mb'}))

//Connect to SQL Database
const db: Connection = mysql.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'airportdb',
    dateStrings: true

})

//Fetch User Information
app.get('/information/:id', (req: Request, res: Response) =>{
    const infoQuery: string = `SELECT  lastName, firstName, middleName, sex, birthday, address, email, contactNumber, flightNumber, photo FROM users WHERE userNumber = ${req.params.id}`
    db.query(infoQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(`User ${req.params.id} Information fetched.`)
        }
    })
})

//Create User
app.post('/createuser', async (req: Request, res: Response) => {
    try{
        const username: string = req.body.username
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10)
        const lastName: string = req.body.lastName
        const firstName: string = req.body.firstName
        const middleName: string = req.body.middleName
        const sex: string = req.body.sex
        const birthday: any = req.body.birthday
        const address: string = req.body.address
        const email: string = req.body.email
        const contactNumber: number = req.body.contactNumber
        const inputValues: any[] = [username, hashedPassword, lastName, firstName, middleName, sex, birthday, address, email, contactNumber]
        const createQuery: string = 'INSERT INTO `users`(`username`, `password`, `lastName`, `firstName`, `middleName`, `sex`, `birthday`, `address`, `email`, `contactNumber`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        db.query(createQuery, inputValues, (err, result) =>{
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

//Edit User
app.put('/edit/:id', (req: Request, res: Response) => {
    const lastName: string = req.body.lastName
    const firstName: string = req.body.firstName
    const middleName: string = req.body.middleName
    const sex: string = req.body.sex
    const birthday: any = req.body.birthday
    const address: string = req.body.address
    const email: string = req.body.email
    const contactNumber: number = req.body.contactNumber
    const flightNumber: number = req.body.flightNumber
    const updateQuery: string = `UPDATE users SET lastName='${lastName}',firstName='${firstName}',middleName='${middleName}',sex='${sex}',
    birthday='${birthday}',address='${address}',email='${email}',contactNumber='${contactNumber}',flightNumber='${flightNumber}' WHERE userNumber = ${req.params.id}`
    db.query(updateQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(`Edited User ${req.params.id} Information.`)
        }
    })
})

//Upload Photo
app.put('/upload/:id', (req: Request, res: Response) => {
    const photo: string = req.body.photo
    const updateQuery: string = `UPDATE users SET photo='${photo}' WHERE userNumber = ${req.params.id}`
    db.query(updateQuery,(err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(`Uploaded User ${req.params.id} Photo.`)
        }
    })
})

//Login
app.post('/login', async (req: Request,res: Response) => {
    const username: string = req.body.username
    const password: string = req.body.password
    const usersQuery: string = 'SELECT * FROM users'
    console.log(`Requesting Access: ${username}`)
    db.query(usersQuery, async (err,result) => {
        if(err){
            console.log(err)
        }else{
            const allUsers: any[] = result
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
                    userNumber: '',
                    login: false,
                })
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Airport Server for Facial Recognition System is running on port ${port}...`)
})