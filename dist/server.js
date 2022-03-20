"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
//Connect to SQL Database
const db = mysql_1.default.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'airportdb',
    dateStrings: true
});
//Fetch User Information
app.get('/information/:id', (req, res) => {
    const infoQuery = `SELECT  lastName, firstName, middleName, sex, birthday, address, email, contactNumber, flightNumber, photo FROM users WHERE userNumber = ${req.params.id}`;
    db.query(infoQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            console.log(`User ${req.params.id} Information fetched.`);
        }
    });
});
//Create User
app.post('/createuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const middleName = req.body.middleName;
        const sex = req.body.sex;
        const birthday = req.body.birthday;
        const address = req.body.address;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const inputValues = [username, hashedPassword, lastName, firstName, middleName, sex, birthday, address, email, contactNumber];
        const createQuery = 'INSERT INTO `users`(`username`, `password`, `lastName`, `firstName`, `middleName`, `sex`, `birthday`, `address`, `email`, `contactNumber`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(createQuery, inputValues, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`Registered User: ${username}, Name: ${lastName}, ${firstName} ${middleName}`);
                res.send({
                    username: username,
                    login: true,
                });
            }
        });
    }
    catch (_a) {
        res.status(500).send();
    }
}));
//Edit User
app.put('/edit/:id', (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const address = req.body.address;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const flightNumber = req.body.flightNumber;
    const updateQuery = `UPDATE users SET lastName='${lastName}',firstName='${firstName}',middleName='${middleName}',sex='${sex}',
    birthday='${birthday}',address='${address}',email='${email}',contactNumber='${contactNumber}',flightNumber='${flightNumber}' WHERE userNumber = ${req.params.id}`;
    db.query(updateQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Edited User ${req.params.id} Information.`);
        }
    });
});
//Upload Photo
app.put('/upload/:id', (req, res) => {
    const photo = req.body.photo;
    const updateQuery = `UPDATE users SET photo='${photo}' WHERE userNumber = ${req.params.id}`;
    db.query(updateQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Uploaded User ${req.params.id} Photo.`);
        }
    });
});
//Login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const usersQuery = 'SELECT * FROM users';
    console.log(`Requesting Access: ${username}`);
    db.query(usersQuery, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
        }
        else {
            const allUsers = result;
            const usernames = allUsers.map(user => user.username);
            if (usernames.includes(username)) {
                const userRef = allUsers.filter(user => user.username === username);
                try {
                    const login = yield bcrypt_1.default.compare(password, userRef[0].password);
                    if (login) {
                        console.log(`User Login: ${username}`);
                        res.send({
                            username: username,
                            userNumber: userRef[0].userNumber,
                            login: true,
                        });
                    }
                    else {
                        console.log("Access Denied: Invalid Credentials.");
                        res.send({
                            username: '',
                            userNumber: '',
                            login: false,
                        });
                    }
                }
                catch (_b) {
                    res.status(400).send("User Not Found.");
                }
            }
            else {
                console.log("Access Denied: Invalid Credentials.");
                res.send({
                    username: '',
                    userNumber: '',
                    login: false,
                });
            }
        }
    }));
}));
app.listen(port, () => {
    console.log(`Airport Server for Facial Recognition System is running on port ${port}...`);
});
