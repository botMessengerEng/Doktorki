import * as express from 'express';
import * as _ from 'lodash';
import * as bodyParser from 'body-parser';
import { MongoCollection } from '../mongo/mongo';
/*
 "In general, the rule of thumb is:
 If you’re installing something that you want to use
 in your program, using require('whatever'), then install
 it locally, at the root of your project. If you’re installing
 something that you want to use in your shell, on the command
 line or something, install it globally, so that its binaries
 end up in your PATH environment variable" ~XiaoPeng
*/
// global.Promise = q.Promise;
// (mongoose as any).Promise = global.Promise;

const app = express();
const collectionUsers = 'Users';
const collectionDoctorDetails = 'DoctorDetails';
const collectionPatientDetails = 'PatientDetails';

const url = 'mongodb://localhost:27017/DoktorkiDB';
const mongoUsers = new MongoCollection(url, collectionUsers);
const mongoDoctorDetails = new MongoCollection(url, collectionDoctorDetails);
const mongoPatientDetails = new MongoCollection(url, collectionPatientDetails);

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>
    res.send('SERVER')
);

// ------------- login   ------------------------------------------------------------------------////////////////////////
app.post('/login', (req: express.Request, res: express.Response) => {
    console.log(JSON.stringify(req.body));
    let user;
        mongoUsers.findElement({
        login: req.body.login,
        password: req.body.password
    }, (result) => user = result)
    .then(() => setTimeout(() => {
            if (user[0] !== undefined) {
                res.json(user[0])
                console.log('tak');
            }
            else{
                res.json('bledny login lub haslo');
                console.log('nie');
                console.log(user);
        }}, 100));
});

// ------------- doctor  ------------------------------------------------------------------------////////////////////////

app.get('/doctor-details', (req: express.Request, res: express.Response) => {
    mongoDoctorDetails.findElement( {role: 'doctor'},
        (result) => res.json(result));
});

app.post('/doctor-details', (req: express.Request, res: express.Response) => {
    mongoDoctorDetails.findElement( {role: req.body.role, login: req.body.login},
        (result) => res.json(result));
});

app.put('/doctor-details', (req: express.Request, res: express.Response) => {
    mongoDoctorDetails.updateElement( {login: req.body.login,
                                                    firstName: req.body.firstName,
                                                    lastName: req.body.lastName,
                                                    gender: req.body.gender,
                                                    age: req.body.age,
                                                    phone: req.body.phone,
                                                    email: req.body.email,
                                                    address: {
                                                        street: req.body.address.street,
                                                        postcode: req.body.address.postcode,
                                                        city: req.body.address.city
                                                    },
                                                    specialization: req.body.specialization},
        (result) => res.json(result));
});

app.put('/delete-doctor', (req: express.Request, res: express.Response) => {
    mongoDoctorDetails.removeElement( req.body,
        () => null)
        .then(() =>
            mongoUsers.removeElement( req.body,
                (result) => res.json(result))
        );
});

app.post('/insert-doctor', (req: express.Request, res: express.Response) => {
    console.log('recived' + JSON.stringify(req.body));
    let user;

    mongoUsers.findElement({ login: req.body.login }, (result) => user = result).then(() => setTimeout(() => {
        console.log(user);
        if (user[0]!==undefined) {
            res.json(`Login ${req.body.login} is in use!`)
        }
        else {
            mongoUsers.insertElements([{login: req.body.login,
                                        password: req.body.password,
                                        role: 'doctor'}],
                                        () => null)
                .then(() =>
                mongoDoctorDetails.insertElements([{    login: req.body.login,
                                                        firstName: req.body.firstName,
                                                        lastName: req.body.lastName,
                                                        role: 'doctor',
                                                        gender: req.body.gender,
                                                        age: req.body.age,
                                                        phone: req.body.phone,
                                                        email: req.body.email,
                                                        address: {
                                                            street: req.body.address.street,
                                                            postcode: req.body.address.postcode,
                                                            city: req.body.address.city
                                                        },
                                                        specialization: req.body.specialization }],
                    result => res.json('OK') )
            )
        }
    }, 500));
});

// ------------- patient ------------------------------------------------------------------------////////////////////////
app.post('/patient-details', (req:express.Request, res: express.Response) => {
    mongoPatientDetails.findElement( { login: req.body.login},
    (result) => res.json(result));
});

app.put('/patient-details', (req: express.Request, res: express.Response) => {
    mongoPatientDetails.updateElement(req.body,
        (result) => res.json(result));
});


// ------------- register -----------------------------------------------------------------------////////////////////////
app.post('/register', (req: express.Request, res: express.Response) => {
    console.log('recived' + JSON.stringify(req.body));
    let user;

    mongoUsers.findElement({ login: req.body.login }, (result) => user = result).then(() => setTimeout(() => {
        console.log(user);
        if (user[0]!==undefined) {
            res.json(`Login ${req.body.login} is in use!`)
        }
        else {
            mongoUsers.insertElements([{login: req.body.login,
                                        password: req.body.password,
                                        role: 'patient'}],
                                        () => null)
                .then(() =>
                mongoPatientDetails.insertElements([{   login: req.body.login,
                                                        role: 'patient',
                                                        firstName: req.body.firstName,
                                                        lastName: req.body.lastName,
                                                        gender: req.body.gender,
                                                        age: req.body.age,
                                                        phone: req.body.phone,
                                                        email: req.body.email,
                                                        dateOfBirth: {
                                                                year: req.body.dateOfBirth.year,
                                                                month: req.body.dateOfBirth.month,
                                                                day: req.body.dateOfBirth.day
                                                        },
                                                        PESEL: req.body.PESEL }],
                    result => res.json('OK') )
            )
        }
    }, 500));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});



///-----------------DataBase Init path -----------------///

app.get('/users-add', (req: express.Request, res: express.Response) => {
    mongoUsers.insertElements([
    {
        "login": "admin",
        "password": "admin",
        "role": "admin"
    },
    {
        "login": "doctor",
        "password": "doctor",
        "role": "doctor"
    },
    {
        "login": "patient",
        "password": "patient",
        "role": "patient"
    },
    {
        "login": "doktorek",
        "password": "prawilny",
        "role": "doctor"
    },
    {
        "login": "doktorBezUprawnien",
        "password": "jakRowerzystaBezUprawnien",
        "role": "doctor"
    },
    {
        "login": "Brooke",
        "password": "1234",
        "role": "doctor"
    },
    {
        "login": "elekarz",
        "password": "@als",
        "role": "doctor"
    },
    {
        "login": "monicaC",
        "password": "anteny",
        "role": "doctor"
    },
    {
        "login": "eve63",
        "password": "eve63",
        "role": "doctor"
    },
    {
        "login": "pawelKrakow",
        "password": "wawel",
        "role": "doctor"
    },
    {
        "login": "leo_z_tarnowa",
        "password": "ananas@66",
        "role": "doctor"
    },
    {
        "login": "doktorro",
        "password": "paprykarz_szczecisnski",
        "role": "doctor"
    },
    {
        "login": "medicziKasia",
        "password": "traktor77",
        "role": "doctor"
    },
    {
        "login": "lolek",
        "password": "bolek",
        "role": "doctor"
    },
    {
        "login": "patient",
        "password": "admin",
        "role": "patient"
    },
    {
        "login": "wpiszLogin",
        "password": "admin",
        "role": "patient"
    },
    {
        "login": "synJacka",
        "password": "admin",
        "role": "patient"
    },
    {
        "login": "Hulk",
        "password": "admin",
        "role": "patient"
    },
    {
        "login": "SpeedyGonzales",
        "password": "admin",
        "role": "patient"
    }
] , (result) => res.send(result));
});



app.get('/doctor-details-add', (req: express.Request, res: express.Response) => {
    mongoDoctorDetails.insertElements([
    {
        'login': 'doktorBezUprawnien',
        'role': 'doctor',
        'firstName': 'John',
        'lastName': 'Smith',
        'gender': 'male',
        'age': 37,
        'phone': '+48 123456789',
        'email': 'doktorBezUprawnien@gmail.com',
        'address': {
            'street': 'Łąkowa 34',
            'postcode': '39-111',
            'city': 'Miasto W'
        },
        'specialization': 'kości'
    },
    {
        'login': 'doctor',
        'role': 'doctor',
        'firstName': 'James',
        'lastName': 'Lovelock',
        'gender': 'male',
        'age': 55,
        'phone': '+48 123465689',
        'email': 'jLovelock@gmail.com',
        'address': {
            'street': 'Love 66',
            'postcode': '595-223',
            'city': 'Paris'
        },
        'specialization': 'logopeda'
    },
    {
        'login': 'doktorek',
        'role': 'doctor',
        'firstName': 'Marcus',
        'lastName': 'Will',
        'gender': 'male',
        'age': 32,
        'phone': '+48 773456789',
        'email': 'doktorek@gmail.com',
        'address': {
            'street': 'Green 123',
            'postcode': '25-083',
            'city': 'Masecziuset'
        },
        'specialization': 'od uszów'
    },
    {
        'login': 'Brooke',
        'role': 'doctor',
        'firstName': 'Brooke',
        'lastName': 'Winchester',
        'gender': 'male',
        'age': 81,
        'phone': '+23 322567289',
        'email': 'BrookeDoctor@gmail.com',
        'address': {
            'street': 'Piernikowa 33',
            'postcode': '22-083',
            'city': 'Carcas'
        },
        'specialization': 'internista'
    },
    {
        'login': 'elekarz',
        'role': 'doctor',
        'firstName': 'Tim',
        'lastName': 'Cole',
        'gender': 'male',
        'age': 46,
        'phone': '+11 773452289',
        'email': 'tim-cole@gmail.com',
        'address': {
            'street': 'Lniana 76',
            'postcode': '22-445',
            'city': 'Colorado'
        }, 
        'specialization': 'alergolog'
    },
    {
        'login': 'monicaC',
        'role': 'doctor',
        'firstName': 'Monica',
        'lastName': 'C',
        'gender': 'female',
        'age': 27,
        'phone': '+77 222116789',
        'email': 'monicaC@gmail.com',
        'address': {
            'street': 'Lukrowa 66',
            'postcode': '211-7783',
            'city': 'Toruń'
        },
        'specialization': 'pediatra'
    },
    {
        'login': 'eve63',
        'role': 'doctor',
        'firstName': 'Eva',
        'lastName': 'Limone',
        'gender': 'female',
        'age': 62,
        'phone': '+48 773456789',
        'email': 'doktorek@gmail.com',
        'address': {
            'street': 'Limonkowa 24',
            'postcode': '35-083',
            'city': 'Floryda'
        },
        'specialization': 'ginekolog'
    },
    {
        'login': 'pawelKrakow',
        'role': 'doctor',
        'firstName': 'Pawel',
        'lastName': 'Kowalski',
        'gender': 'male',
        'age': 37,
        'phone': '+48 123454755',
        'email': 'pawelKrakow@gmail.com',
        'address': {
            'street': 'Słowackiego 45',
            'postcode': '30-083',
            'city': 'Kraków'
        },
        'specialization': 'kardiolog'
    },
    {
        'login': 'leo_z_tarnowa',
        'role': 'doctor',
        'firstName': 'Leopold',
        'lastName': 'Brzytwa',
        'gender': 'male',
        'age': 31,
        'phone': '+48 133456789',
        'email': 'leo@gmail.com',
        'address': {
            'street': 'Ładna 11',
            'postcode': '35-283',
            'city': 'Tarnów'
        },
        'specialization': 'kardiolog'
    },
    {
        'login': 'doktorro',
        'role': 'doctor',
        'firstName': 'Pedro',
        'lastName': 'El Gonzalez',
        'gender': 'male',
        'age': 49,
        'phone': '+18 773234789',
        'email': 'doktorro@gmail.com',
        'address': {
            'street': 'Naczosów 23',
            'postcode': '25-083',
            'city': 'Cancun'
        },
        'specialization': 'okulista'
    },
    {
        'login': 'medicziKasia',
        'role': 'doctor',
        'firstName': 'Katarzyna',
        'lastName': 'Medycejska',
        'gender': 'female',
        'age': 39,
        'phone': '+48 73131789',
        'email': 'mediczi@gmail.com',
        'address': {
            'street': 'Paryska 55',
            'postcode': '15-0443',
            'city': 'Florencja'
        },
        'specialization': 'stomatolog'
    },
        {
        'login': 'lolek',
        'role': 'doctor',
        'firstName': 'Leonidas',
        'lastName': 'Włodarczyk',
        'gender': 'male',
        'age': 65,
        'phone': '+18 973346789',
        'email': 'lolek@gmail.com',
        'address': {
            'street': 'Fiołkowa 13',
            'postcode': '45-033',
            'city': 'Gdańsk'
        },
        'specialization': 'chirurg'
    }
] , (result) => res.send(result));
});


app.get('/patient-details-add', (req: express.Request, res: express.Response) => {
    mongoPatientDetails.insertElements([
        {
        "login": "patient",
        "firstName": "Leopold",
        "lastName": "Staff",
        "gender": "male",
        "phone": "+48 666253442",
        "email": "b.f.staff@yahoo.lol",
        "dateOfBirth": {
            "year": 1977,
            "month": "Aug",
            "day": 24
        },
        "PESEL": "77082410610"
    },
    {
        "login": "wpiszLogin",
        "firstName": "Zygfryd",
        "lastName": "Siwonogi",
        "gender": "male",
        "phone": "124324235",
        "email": "mail@mainNa5minut.pl",
        "dateOfBirth": {
            "year": 1902,
            "month": "Dec",
            "day": 31
        },
        "PESEL": "02123102319"
    },
    {
        "login": "synJacka",
        "firstName": "Skalbimierz",
        "lastName": "Uważny",
        "gender": "male",
        "phone": "124524887",
        "email": "skalbimerz.uwazy@gmial.com",
        "dateOfBirth": {
            "year": 1982,
            "month": "Mar",
            "day": 11
        },
        "PESEL": "82031118433"
    },
    {
        "login": "Hulk",
        "firstName": "Bruce",
        "lastName": "Banner",
        "gender": "male",
        "phone": "102988372",
        "email": "hugeandgreen@stark.industries.com",
        "dateOfBirth": {
            "year": 1962,
            "month": "May",
            "day": 2
        },
        "PESEL": "62050211094"
    },
    {
        "login": "SpeedyGonzales",
        "firstName": "Wacław",
        "lastName": "Pośpieszny",
        "gender": "male",
        "phone": "382910928",
        "email": "hjgfs@interia.eu",
        "dateOfBirth": {
            "year": 1983,
            "month": "Feb",
            "day": 21
        },
        "PESEL": "83022114618"
    }
    ], (result) => res.json(result));
});



app.get('/init-db', (req: express.Request, res: express.Response) => {
    mongoUsers.drop()
    .then(() => mongoPatientDetails.drop()
        .then(() => mongoDoctorDetails.drop()
            .then(() => mongoUsers.insertElements([
                {
                    'login': 'admin',
                    'password': 'admin',
                    'role': 'admin'
                },
                {
                    'login': 'doctor',
                    'password': 'doctor',
                    'role': 'doctor'
                },
                {
                    'login': 'doktorek',
                    'password': 'prawilny',
                    'role': 'doctor'
                },
                {
                    'login': 'doktorBezUprawnien',
                    'password': 'jakRowerzystaBezUprawnien',
                    'role': 'doctor'
                },
                {
                    'login': 'Brooke',
                    'password': '1234',
                    'role': 'doctor'
                },
                {
                    'login': 'elekarz',
                    'password': '@als',
                    'role': 'doctor'
                },
                {
                    'login': 'monicaC',
                    'password': 'anteny',
                    'role': 'doctor'
                },
                {
                    'login': 'eve63',
                    'password': 'eve63',
                    'role': 'doctor'
                },
                {
                    'login': 'pawelKrakow',
                    'password': 'wawel',
                    'role': 'doctor'
                },
                {
                    'login': 'leo_z_tarnowa',
                    'password': 'ananas@66',
                    'role': 'doctor'
                },
                {
                    'login': 'doktorro',
                    'password': 'paprykarz_szczecisnski',
                    'role': 'doctor'
                },
                {
                    'login': 'medicziKasia',
                    'password': 'traktor77',
                    'role': 'doctor'
                },
                {
                    'login': 'lolek',
                    'password': 'bolek',
                    'role': 'doctor'
                },
                {
                    'login': 'patient',
                    'password': 'admin',
                    'role': 'patient'
                },
                {
                    'login': 'wpiszLogin',
                    'password': 'admin',
                    'role': 'patient'
                },
                {
                    'login': 'synJacka',
                    'password': 'admin',
                    'role': 'patient'
                },
                {
                    'login': 'Hulk',
                    'password': 'admin',
                    'role': 'patient'
                },
                {
                    'login': 'SpeedyGonzales',
                    'password': 'admin',
                    'role': 'patient'
                }
            ], (result) => null)
                .then(() => mongoPatientDetails.insertElements([
                    {
                        "login": "patient",
                        "firstName": "Leopold",
                        "lastName": "Staff",
                        "gender": "male",
                        "phone": "+48 666253442",
                        "email": "b.f.staff@yahoo.lol",
                        "dateOfBirth": {
                            "year": 1977,
                            "month": "Aug",
                            "day": 24
                        },
                        "PESEL": "77082410610"
                    },
                    {
                        "login": "wpiszLogin",
                        "firstName": "Zygfryd",
                        "lastName": "Siwonogi",
                        "gender": "male",
                        "phone": "124324235",
                        "email": "mail@mainNa5minut.pl",
                        "dateOfBirth": {
                            "year": 1902,
                            "month": 'Dec',
                            "day": 31
                        },
                        "PESEL": "02123102319"
                    },
                    {
                        "login": "synJacka",
                        "firstName": "Skalbimierz",
                        "lastName": "Uważny",
                        "gender": "male",
                        "phone": "124524887",
                        "email": "skalbimerz.uwazy@gmial.com",
                        "dateOfBirth": {
                            "year": 1982,
                            "month": "Mar",
                            "day": 11
                        },
                        "PESEL": "82031118433"
                    },
                    {
                        "login": "Hulk",
                        "firstName": "Bruce",
                        "lastName": "Banner",
                        "gender": "male",
                        "phone": "102988372",
                        "email": "hugeandgreen@stark.industries.com",
                        "dateOfBirth": {
                            "year": 1962,
                            "month": "May",
                            "day": 2
                        },
                        "PESEL": "62050211094"
                    },
                    {
                        "login": "SpeedyGonzales",
                        "firstName": "Wacław",
                        "lastName": "Pośpieszny",
                        "gender": "male",
                        "phone": "382910928",
                        "email": "hjgfs@interia.eu",
                        "dateOfBirth": {
                            "year": 1983,
                            "month": "Feb",
                            "day": 21
                        },
                        "PESEL": "83022114618"
                    }
                ], (result) => null)
                    .then(() => mongoDoctorDetails.insertElements([
                        {
                            'login': 'doktorBezUprawnien',
                            'role': 'doctor',
                            'firstName': 'John',
                            'lastName': 'Smith',
                            'gender': 'male',
                            'age': 37,
                            'phone': '+48 123456789',
                            'email': 'doktorBezUprawnien@gmail.com',
                            'address': {
                                'street': 'Łąkowa 34',
                                'postcode': '39-111',
                                'city': 'Miasto W'
                            },
                            'specialization': 'kości'
                        },
                        {
                            'login': 'doctor',
                            'role': 'doctor',
                            'firstName': 'James',
                            'lastName': 'Lovelock',
                            'gender': 'male',
                            'age': 55,
                            'phone': '+48 123465689',
                            'email': 'jLovelock@gmail.com',
                            'address': {
                                'street': 'Love 66',
                                'postcode': '595-223',
                                'city': 'Paris'
                            },
                            'specialization': 'logopeda'
                        },
                        {
                            'login': 'doktorek',
                            'role': 'doctor',
                            'firstName': 'Marcus',
                            'lastName': 'Will',
                            'gender': 'male',
                            'age': 32,
                            'phone': '+48 773456789',
                            'email': 'doktorek@gmail.com',
                            'address': {
                                'street': 'Green 123',
                                'postcode': '25-083',
                                'city': 'Masecziuset'
                            },
                            'specialization': 'od uszów'
                        },
                        {
                            'login': 'Brooke',
                            'role': 'doctor',
                            'firstName': 'Brooke',
                            'lastName': 'Winchester',
                            'gender': 'male',
                            'age': 81,
                            'phone': '+23 322567289',
                            'email': 'BrookeDoctor@gmail.com',
                            'address': {
                                'street': 'Piernikowa 33',
                                'postcode': '22-083',
                                'city': 'Carcas'
                            },
                            'specialization': 'internista'
                        },
                        {
                            'login': 'elekarz',
                            'role': 'doctor',
                            'firstName': 'Tim',
                            'lastName': 'Cole',
                            'gender': 'male',
                            'age': 46,
                            'phone': '+11 773452289',
                            'email': 'tim-cole@gmail.com',
                            'address': {
                                'street': 'Lniana 76',
                                'postcode': '22-445',
                                'city': 'Colorado'
                            }, 
                            'specialization': 'alergolog'
                        },
                        {
                            'login': 'monicaC',
                            'role': 'doctor',
                            'firstName': 'Monica',
                            'lastName': 'C',
                            'gender': 'female',
                            'age': 27,
                            'phone': '+77 222116789',
                            'email': 'monicaC@gmail.com',
                            'address': {
                                'street': 'Lukrowa 66',
                                'postcode': '211-7783',
                                'city': 'Toruń'
                            },
                            'specialization': 'pediatra'
                        },
                        {
                            'login': 'eve63',
                            'role': 'doctor',
                            'firstName': 'Eva',
                            'lastName': 'Limone',
                            'gender': 'female',
                            'age': 62,
                            'phone': '+48 773456789',
                            'email': 'doktorek@gmail.com',
                            'address': {
                                'street': 'Limonkowa 24',
                                'postcode': '35-083',
                                'city': 'Floryda'
                            },
                            'specialization': 'ginekolog'
                        },
                        {
                            'login': 'pawelKrakow',
                            'role': 'doctor',
                            'firstName': 'Pawel',
                            'lastName': 'Kowalski',
                            'gender': 'male',
                            'age': 37,
                            'phone': '+48 123454755',
                            'email': 'pawelKrakow@gmail.com',
                            'address': {
                                'street': 'Słowackiego 45',
                                'postcode': '30-083',
                                'city': 'Kraków'
                            },
                            'specialization': 'kardiolog'
                        },
                        {
                            'login': 'leo_z_tarnowa',
                            'role': 'doctor',
                            'firstName': 'Leopold',
                            'lastName': 'Brzytwa',
                            'gender': 'male',
                            'age': 31,
                            'phone': '+48 133456789',
                            'email': 'leo@gmail.com',
                            'address': {
                                'street': 'Ładna 11',
                                'postcode': '35-283',
                                'city': 'Tarnów'
                            },
                            'specialization': 'kardiolog'
                        },
                        {
                            'login': 'doktorro',
                            'role': 'doctor',
                            'firstName': 'Pedro',
                            'lastName': 'El Gonzalez',
                            'gender': 'male',
                            'age': 49,
                            'phone': '+18 773234789',
                            'email': 'doktorro@gmail.com',
                            'address': {
                                'street': 'Naczosów 23',
                                'postcode': '25-083',
                                'city': 'Cancun'
                            },
                            'specialization': 'okulista'
                        },
                        {
                            'login': 'medicziKasia',
                            'role': 'doctor',
                            'firstName': 'Katarzyna',
                            'lastName': 'Medycejska',
                            'gender': 'female',
                            'age': 39,
                            'phone': '+48 73131789',
                            'email': 'mediczi@gmail.com',
                            'address': {
                                'street': 'Paryska 55',
                                'postcode': '15-0443',
                                'city': 'Florencja'
                            },
                            'specialization': 'stomatolog'
                        },
                            {
                            'login': 'lolek',
                            'role': 'doctor',
                            'firstName': 'Leonidas',
                            'lastName': 'Włodarczyk',
                            'gender': 'male',
                            'age': 65,
                            'phone': '+18 973346789',
                            'email': 'lolek@gmail.com',
                            'address': {
                                'street': 'Fiołkowa 13',
                                'postcode': '45-033',
                                'city': 'Gdańsk'
                            },
                            'specialization': 'chirurg'
                        }
                    ], (result) => res.json(result)))))));
})
