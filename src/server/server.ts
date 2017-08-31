import * as express from 'express';
import * as _ from 'lodash';                        // czy to jest w ogóle potrzebne ? ... ---ale wygląda spoko ta biblioteka
import * as bodyParser from 'body-parser';
import { MongoCollection } from '../mongo/mongo';
import { initDB } from './init-db'
/*
 "In general, the rule of thumb is:
 If you’re installing something that you want to use
 in your program, using require('whatever'), then install
 it locally, at the root of your project. If you’re installing
 something that you want to use in your shell, on the command
 line or something, install it globally, so that its binaries
 end up in your PATH environment variable" ~XiaoPeng
*/

const app = express();
const collectionUsers = 'Users';
const collectionUsersDetails = 'UsersDetails';
const collectionSchedule = 'Schedule';

const url = 'mongodb://localhost:27017/DoktorkiDB';
const mongoUsers = new MongoCollection(url, collectionUsers);
const mongoUsersDetails = new MongoCollection(url, collectionUsersDetails);
const mongoSchedule = new MongoCollection(url, collectionSchedule);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    else {
        res.json('bledny login lub haslo');
        console.log('nie');
        console.log(user);
    };
});

// ------------- user  ------------------------------------------------------------------------////////////////////////
app.route('/user-details/:param?')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const param = req.param('param') ? {role: req.param('param')} : {};
            const result = await mongoUsersDetails.findElement(param)
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    })
    .post(async (req: express.Request, res: express.Response) => {
        try {
            const result = await mongoUsersDetails.findElement({ login: req.body.login });
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    })
    .put(async (req: express.Request, res: express.Response) => {
        try {
            if (req.param('param') === 'doctor') {
                await Promise.all([ 
                    mongoUsersDetails.updateElement(
                        {
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                            specializations: req.body.specializations,
                            workingHours: {
                                monday: {
                                    start: req.body.workingHours.monday.start,
                                    end: req.body.workingHours.monday.end
                                },
                                tuesday: {
                                    start: req.body.workingHours.tuesday.start,
                                    end: req.body.workingHours.tuesday.end
                                },
                                wednesday: {
                                    start: req.body.workingHours.wednesday.start,
                                    end: req.body.workingHours.wednesday.end
                                },
                                thursday: {
                                    start: req.body.workingHours.thursday.start,
                                    end: req.body.workingHours.thursday.end
                                },
                                friday: {
                                    start: req.body.workingHours.friday.start,
                                    end: req.body.workingHours.friday.end
                                }
                            }
                        }
                    )
                ]);
            } else if (req.param('param') === 'patient') {
                await Promise.all([
                    mongoUsersDetails.updateElement(
                        {
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                        }
                    )
                ]);
            }
            res.status(200).json('Updates');
        } catch (err) {
            res.send(err);
        }
    });

app.delete('/delete-user/:login', async (req: express.Request, res: express.Response) => {
    try {
        const result = await Promise.all([
            mongoUsersDetails.removeElement({ login: req.param('login') }),
            mongoUsers.removeElement({ login: req.param('login') })
        ]);
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

app.post('/insert-user/:param', async (req: express.Request, res: express.Response) => {
    console.log('recived' + JSON.stringify(req.body));

    const user = await mongoUsers.findElement({ login: req.body.login })
    try {
        console.log(user);
        if (user[0] !== undefined) {
            res.json(`Login ${req.body.login} is in use!`)
        } else {
            if (req.param('param') === 'doctor') {
                await Promise.all([
                    mongoUsers.insertElements([
                        {
                            login: req.body.login,
                            password: req.body.password,
                            role: 'doctor'
                        }
                    ]),
                    mongoUsersDetails.insertElements([
                        {
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            role: req.body.role,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                            specializations: req.body.specializations,
                            workingHours: {
                                monday: {
                                    start: req.body.workingHours.monday.start,
                                    end: req.body.workingHours.monday.end
                                },
                                tuesday: {
                                    start: req.body.workingHours.tuesday.start,
                                    end: req.body.workingHours.tuesday.end
                                },
                                wednesday: {
                                    start: req.body.workingHours.wednesday.start,
                                    end: req.body.workingHours.wednesday.end
                                },
                                thursday: {
                                    start: req.body.workingHours.thursday.start,
                                    end: req.body.workingHours.thursday.end
                                },
                                friday: {
                                    start: req.body.workingHours.friday.start,
                                    end: req.body.workingHours.friday.end
                                }
                            }
                        }
                    ])
                ]);
            } else if (req.param('param') === 'patient') {
                await Promise.all([
                    mongoUsers.insertElements([
                        {
                            login: req.body.login,
                            password: req.body.password,
                            role: 'patient'
                        }
                    ]),
                    mongoUsersDetails.insertElements([
                        {
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            role: req.body.role,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                        }
                    ])
                ]);
            }

            res.json('OK')
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
            const result = await mongoSchedule.showElements();
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
            const result = await mongoSchedule.findElement({
                login: req.body.login,
                'date.year': req.body.date.year ? req.body.date.year : { $regex: /.*?/ },
                'date.month': req.body.date.month ? req.body.date.month : { $regex: /.*?/ },
                'date.day': req.body.date.day ? req.body.date.day : { $regex: /.*?/ },
                'date.hour': req.body.date.hour ? req.body.date.hour : { $regex: /.*?/ }
            }
            );
            res.json(result);
        } catch (err) {
            res.send(err);
        }
    });

app.post('/schedule/:param', async (req: express.Request, res: express.Response) => {
    try {
        const result = await mongoSchedule.findElement({ login: req.body.login }, { 'date.year': 1, 'date.month': 1, 'date.day': 1, 'date.hour': 1 }, +req.param('param'));
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});
///-----------------DataBase Init path -----------------///
app.get('/init-db', async (req: express.Request, res: express.Response) => {
    try {
        const result = await initDB(mongoUsers, mongoUsersDetails, mongoSchedule);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});