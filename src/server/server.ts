import * as express from 'express';
import * as _ from 'lodash';                        // czy to jest w ogóle potrzebne ? ... ---ale wygląda spoko ta biblioteka
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
const collectionSchedule = 'Schedule';

const url = 'mongodb://localhost:27017/DoktorkiDB';
const mongoUsers = new MongoCollection(url, collectionUsers);
const mongoDoctorDetails = new MongoCollection(url, collectionDoctorDetails);
const mongoPatientDetails = new MongoCollection(url, collectionPatientDetails);
const mongoSchedule = new MongoCollection(url, collectionSchedule);

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
app.post('/login', async (req: express.Request, res: express.Response) => {
        console.log(JSON.stringify(req.body));

        const user = await mongoUsers.findElement({
            login: req.body.login,
            password: req.body.password
        });
        if (user[0] !== undefined) {
            res.status(200).json(user[0]).end();
            console.log('tak');
        }
        else{
            res.json('bledny login lub haslo');
            console.log('nie');
            console.log(user);
        };
});

// ------------- doctor  ------------------------------------------------------------------------////////////////////////
app.route('/doctor-details')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoDoctorDetails.findElement({})
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    })
    .post(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoDoctorDetails.findElement( { login: req.body.login});
            res.json(result)
        } catch (err) {
            res.send(err);
        }
    })
    .put(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoDoctorDetails.updateElement( 
                {login: req.body.login,
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
                specializations: req.body.specializations});
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    });

app.put('/delete-doctor', async (req: express.Request, res: express.Response) => {
        try {
            const result = await Promise.all([
                mongoDoctorDetails.removeElement( req.body),
                mongoUsers.removeElement( req.body)
            ]);
            res.json(result);
        } catch (err) {
            res.send(err);
        }
});

app.post('/insert-doctor', async (req: express.Request, res: express.Response) => {
    console.log('recived' + JSON.stringify(req.body));

    const user = await mongoUsers.findElement({ login: req.body.login })
        try {
            console.log(user);
            if (user[0] !== undefined) {
                res.json(`Login ${req.body.login} is in use!`)
            } else {
                await Promise.all([
                    mongoUsers.insertElements([
                        {login: req.body.login,
                        password: req.body.password,
                        role: 'doctor'}
                    ]),
                    mongoDoctorDetails.insertElements([
                        {login: req.body.login,
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
                        specializations: req.body.specializations }
                    ])
                ]);
                res.json('OK')
            }
        } catch (err) {
            res.send(err);
        }
});

// ------------- patient ------------------------------------------------------------------------////////////////////////
app.route('/patient-details')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoDoctorDetails.findElement({});
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    })
    .put(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoPatientDetails.updateElement(req.body);
            res.json(result)
        } catch (err) {
            res.send(err);
        }
    })
    .post(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoPatientDetails.findElement( {login: req.body.login});
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    });

// ------------- register -----------------------------------------------------------------------////////////////////////
app.post('/register', async (req: express.Request, res: express.Response) => {
    try {
        console.log('recived' + JSON.stringify(req.body));

        const user = await mongoUsers.findElement({ login: req.body.login });
        console.log(user);
        if (user[0]!==undefined) {
            res.json(`Login ${req.body.login} is in use!`).end();
        } else {
            await Promise.all([
                mongoUsers.insertElements([
                    {login: req.body.login,
                    password: req.body.password,
                    role: 'patient'}
                ]),
                mongoPatientDetails.insertElements([
                    {login: req.body.login,
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
                    PESEL: req.body.PESEL }
                ])
            ]);
            res.status(200).json('OK').end();
        }
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// ------------- schedule -----------------------------------------------------------------------////////////////////////
app.route('/schedule')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoSchedule.findElement({});
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    })
    .put(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoSchedule.updateElement(req.body);
            res.json(result)
        } catch (err) {
            res.send(err);
        }
    })
    .post(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoSchedule.findElement( {login: req.body.login,
                                                            'date.hour': {$regex: /.*?/},
                                                            'date.year': req.body.date.year,
                                                            'date.month': req.body.date.month,
                                                            'date.day': req.body.date.day}
            );
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    });
///-----------------DataBase Init path -----------------///
app.get('/init-db', async (req: express.Request, res: express.Response) => {
    try {
        await Promise.all([
            mongoUsers.drop(),
            mongoPatientDetails.drop(),
            mongoDoctorDetails.drop(),
            mongoSchedule.drop()
        ]);
        const result = await Promise.all([
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
                },
                {
                    "login": "Mark",
                    "password": "admin",
                    "role": "patient"
                },
                {
                    "login": "Robinio",
                    "password": "admin",
                    "role": "patient"
                },
                {
                    "login": "Jess",
                    "password": "admin",
                    "role": "patient"
                },
                {
                    "login": "Heisenberg",
                    "password": "Werner",
                    "role": "patient"
                },
                {
                    "login": "Jesse",
                    "password": "admin",
                    "role": "patient"
                }
            ]),
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
                        "month": "August",
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
                        "month": "December",
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
                        "month": "March",
                        "day": 11
                    },
                    "PESEL": "82031118433"
                },
                {
                    "login": "Hulk",
                    "firstName": "Bruce",
                    "lastName": "Banner",
                    "gender": "male",
                    "phone": "102988392",
                    "email": "mark@onet.pl",
                    "dateOfBirth": {
                        "year": 1982,
                        "month": "May",
                        "day": 2
                    },
                    "PESEL": "62050211094"
                },
                {
                    "login": "Mark",
                    "firstName": "Marek",
                    "lastName": "Markowicz",
                    "gender": "male",
                    "phone": "102988372",
                    "email": "hugeandgreen@stark.industries.com",
                    "dateOfBirth": {
                        "year": 1962,
                        "month": "May",
                        "day": 2
                    },
                    "PESEL": "82050218792"
                },
                {
                    "login": "Robinio",
                    "firstName": "Robert",
                    "lastName": "Górski",
                    "gender": "male",
                    "phone": "102118372",
                    "email": "nnfksjths@o2.com",
                    "dateOfBirth": {
                        "year": 1993,
                        "month": "May",
                        "day": 7
                    },
                    "PESEL": "93050816835"
                },
                {
                    "login": "Jess",
                    "firstName": "Justyna",
                    "lastName": "Franiewska",
                    "gender": "female",
                    "phone": "118268372",
                    "email": "jess_92@gmail.com",
                    "dateOfBirth": {
                        "year": 1992,
                        "month": "October",
                        "day": 3
                    },
                    "PESEL": "92100308786"
                },
                {
                    "login": "Heisenberg",
                    "firstName": "Walter",
                    "lastName": "White",
                    "gender": "male",
                    "phone": "118200372",
                    "email": "babyblue@gmail.com",
                    "dateOfBirth": {
                        "year": 1959,
                        "month": "September",
                        "day": 7
                    },
                    "PESEL": "59090719558"
                },
                {
                    "login": "Jesse",
                    "firstName": "Jesse",
                    "lastName": "Pinkman",
                    "gender": "male",
                    "phone": "118200372",
                    "email": "yeahb_tch@gmail.com",
                    "dateOfBirth": {
                        "year": 1984,
                        "month": "September",
                        "day": 17
                    },
                    "PESEL": "84091713058"
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
                        "month": "February",
                        "day": 21
                    },
                    "PESEL": "83022114618"
                }
            ]),
            mongoDoctorDetails.insertElements([
                {
                    'login': 'doktorBezUprawnien',
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
                    'specializations': [{'specialization': 'kości'}],
                    "workingHours": {
                        "monday": {
                            "start": "18:00",
                            "end": "22:00"
                        },
                        "tuesday": {
                            "start": "7:00",
                            "end": "15:30"
                        },
                        "wednesday": {
                            "start": "6:00",
                            "end": "11:15"
                        },
                        "thursday": {
                            "start": "14:30",
                            "end": "21:00"
                        },
                        "friday": {
                            "start": "6:15",
                            "end": "13:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'doctor',
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
                    'specializations': [{'specialization':'logopeda'}],
                    "workingHours": {
                        "monday": {
                            "start": "8:00",
                            "end": "14:00"
                        },
                        "tuesday": {
                            "start": "7:30",
                            "end": "15:00"
                        },
                        "wednesday": {
                            "start": "7:00",
                            "end": "18:00"
                        },
                        "thursday": {
                            "start": "12:00",
                            "end": "20:00"
                        },
                        "friday": {
                            "start": "13:00",
                            "end": "21:45"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'doktorek',
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
                    'specializations': [{'specialization':'od uszów'}],
                    "workingHours": {
                        "monday": {
                            "start": "8:00",
                            "end": "16:15"
                        },
                        "tuesday": {
                            "start": "12:30",
                            "end": "17:00"
                        },
                        "wednesday": {
                            "start": "12:00",
                            "end": "16:45"
                        },
                        "thursday": {
                            "start": "9:15",
                            "end": "17:45"
                        },
                        "friday": {
                            "start": "15:00",
                            "end": "22:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'Brooke',
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
                    'specializations': [{'specialization':'internista'}],
                    "workingHours": {
                        "monday": {
                            "start": "12:15",
                            "end": "19:15"
                        },
                        "tuesday": {
                            "start": "7:00",
                            "end": "14:30"
                        },
                        "wednesday": {
                            "start": "8:15",
                            "end": "15:15"
                        },
                        "thursday": {
                            "start": "17:45",
                            "end": "22:00"
                        },
                        "friday": {
                            "start": "12:00",
                            "end": "16:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'elekarz',
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
                    'specializations': [{'specialization':'alergolog'}],
                    "workingHours": {
                       "monday": {
                            "start": "8:00",
                            "end": "16:00"
                        },
                        "tuesday": {
                            "start": "7:15",
                            "end": "15:30"
                        },
                        "wednesday": {
                            "start": "6:00",
                            "end": "14:00"
                        },
                        "thursday": {
                            "start": "13:30",
                            "end": "21:30"
                        },
                        "friday": {
                            "start": "16:15",
                            "end": "22:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    } 
                 },
                {
                    'login': 'monicaC',
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
                    'specializations': [{'specialization':'pediatra'}],
                    "workingHours": {
                        "monday": {
                            "start": "9:00",
                            "end": "15:00"
                        },
                        "tuesday": {
                            "start": "13:00",
                            "end": "19:30"
                        },
                        "wednesday": {
                            "start": "12:00",
                            "end": "18:15"
                        },
                        "thursday": {
                            "start": "12:30",
                            "end": "21:15"
                        },
                        "friday": {
                            "start": "6:45",
                            "end": "15:15"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }   
                },
                {
                    'login': 'eve63',
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
                    'specializations': [{'specialization':'ginekolog'}],
                    "workingHours": {
                        "monday": {
                            "start": "11:00",
                            "end": "18:00"
                        },
                        "tuesday": {
                            "start": "12:00",
                            "end": "17:30"
                        },
                        "wednesday": {
                            "start": "16:00",
                            "end": "21:15"
                        },
                        "thursday": {
                            "start": "13:30",
                            "end": "20:00"
                        },
                        "friday": {
                            "start": "7:00",
                            "end": "15:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }  
                 },
                {
                    'login': 'pawelKrakow',
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
                    'specializations': [{'specialization':'kardiolog'}],
                    "workingHours": {
                        "monday": {
                            "start": "11:00",
                            "end": "15:00"
                        },
                        "tuesday": {
                            "start": "7:00",
                            "end": "15:30"
                        },
                        "wednesday": {
                            "start": "7:15",
                            "end": "15:15"
                        },
                        "thursday": {
                            "start": "13:30",
                            "end": "22:00"
                        },
                        "friday": {
                            "start": "9:00",
                            "end": "14:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'leo_z_tarnowa',
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
                    'specializations': [{'specialization':'kardiolog'}],
                    "workingHours": {
                        "monday": {
                            "start": "8:00",
                            "end": "15:00"
                        },
                        "tuesday": {
                            "start": "7:00",
                            "end": "15:30"
                        },
                        "wednesday": {
                            "start": "12:00",
                            "end": "18:15"
                        },
                        "thursday": {
                            "start": "14:30",
                            "end": "21:00"
                        },
                        "friday": {
                            "start": "15:15",
                            "end": "21:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'doktorro',
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
                    'specializations': [{'specialization':'okulista'}, {'specialization':'laryngolog'}],
                    "workingHours": {
                        "monday": {
                            "start": "9:00",
                            "end": "14:00"
                        },
                        "tuesday": {
                            "start": "11:00",
                            "end": "17:30"
                        },
                        "wednesday": {
                            "start": "8:15",
                            "end": "14:15"
                        },
                        "thursday": {
                            "start": "14:30",
                            "end": "21:00"
                        },
                        "friday": {
                            "start": "9:00",
                            "end": "13:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'medicziKasia',
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
                    'specializations': [{'specialization':'stomatolog'}],
                    "workingHours": {
                      "monday": {
                            "start": "11:00",
                            "end": "15:00"
                        },
                        "tuesday": {
                            "start": "17:00",
                            "end": "21:30"
                        },
                        "wednesday": {
                            "start": "8:00",
                            "end": "15:15"
                        },
                        "thursday": {
                            "start": "12:30",
                            "end": "18:00"
                        },
                        "friday": {
                            "start": "12:15",
                            "end": "17:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }
                },
                {
                    'login': 'lolek',
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
                    'specializations': [{'specialization':'chirurg'}, {'specialization':'od uszów'}],
                    "workingHours": {
                       "monday": {
                            "start": "7:00",
                            "end": "14:00"
                        },
                        "tuesday": {
                            "start": "7:15",
                            "end": "15:30"
                        },
                        "wednesday": {
                            "start": "8:00",
                            "end": "12:15"
                        },
                        "thursday": {
                            "start": "11:30",
                            "end": "16:00"
                        },
                        "friday": {
                            "start": "13:15",
                            "end": "21:00"
                        },
                        "saturday": {
                            "start": "",
                            "end": ""
                        },
                        "sunday": {
                            "start": "",
                            "end": ""
                        }
                    }    
                }
            ]),
            mongoSchedule.insertElements([
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "8:00"
                    },
                    "patient": {
                        "login": "patient",
                        "description": "strzała w kolano"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "10:00"
                    },
                    "patient": {
                        "login": "wpiszLogin",
                        "description": "L4"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "13:30"
                    },
                    "patient": {
                        "login": "synJacka",
                        "description": "złamałem nogę przez nie uwagę"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "12:00"
                    },
                    "patient": {
                        "login": "Hulk",
                        "description": "napromieniowało mnie"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "12:30"
                    },
                    "patient": {
                        "login": "Mark",
                        "description": "L4"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "12:45"
                    },
                    "patient": {
                        "login": "Robinio",
                        "description": "L4"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "11:15"
                    },
                    "patient": {
                        "login": "Jess",
                        "description": "a tak z nudów"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "9:15"
                    },
                    "patient": {
                        "login": "Heisenberg",
                        "description": "odbior wynikow badania"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "9:45"
                    },
                    "patient": {
                        "login": "Jesse",
                        "description": "wypadek przy pracy"  
                    }
                },
                {
                    "login": "doctor",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 21,
                        "hour": "13:45"
                    },
                    "patient": {
                        "login": "SpeedyGonzales",
                        "description": "koncza się speed-tabsy doktorze"
                    }
                },
                {
                    "login": "lolek",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 25,
                        "hour": "13:15"
                    },
                    "patient": {
                        "login": "Heisenberg",
                        "description": "prześwietlenie ucha"
                    }
                },
                {
                    "login": "lolek",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 25,
                        "hour": "15:45"
                    },
                    "patient": {
                        "login": "SpeedyGonzales",
                        "description": "zdjęcie gipsu"
                    }
                },
                {
                    "login": "lolek",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 24,
                        "hour": "12:45"
                    },
                    "patient": {
                        "login": "Jesse",
                        "description": "zdjęcie szwów z rozciętego łuku brwiowego"
                    }
                },
                 {
                    "login": "doktorBezUprawnien",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 24,
                        "hour": "18:30"
                    },
                    "patient": {
                        "login": "Jesse",
                        "description": "sprawdzenie kości czaszki"
                    }
                },
                {
                    "login": "doktorBezUprawnien",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 24,
                        "hour": "19:15"
                    },
                    "patient": {
                        "login": "Hulk",
                        "description": "naprawa kości po walce ze złem"
                    }
                },
                {
                    "login": "doktorBezUprawnien",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 30,
                        "hour": "9:15"
                    },
                    "patient": {
                        "login": "synJacka",
                        "description": "naprawa całości"
                    }
                },
                {
                    "login": "Brooke",
                    "date": {
                        "year":2017,
                        "month": "August",
                        "day": 24,
                        "hour": "21:15"
                    },
                    "patient": {
                        "login": "synJacka",
                        "description": "choroba afrykańska(?)"
                    }
                },
            ])
            ]);

            res.json(result);
    } catch (err) {
        res.send(err);
    }
});