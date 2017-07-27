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
const url = 'mongodb://localhost:27017/DoktorkiDB';
const mongo = new MongoCollection(url, collectionUsers);


app.use((req, res, next) => { 
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/up', (req, res: express.Response) => {
    mongo.insertElements([{
        login: 'doktorek',
        password: 'prawilny',
        role: 'doctor',
    },
    {
        login: 'doktorBezUprawnien',
        password: 'jakRowerzystaBezUprawnien',
        role: 'doctor'
    },
    {
        login: 'Brooke',
        password: '1234',
        role: 'doctor'
    }] ,(result) => res.send(result));
});

app.get('/doctors', (req: express.Request, res: express.Response) => {
    res.send(doctors);
});

app.get('/doctors/:id', function (req, res){
    var doctor = getDocById(req.params.id);

    if (doctor) 
        res.send(doctor);
    else
        res.send(400);
});

app.put('/doctors/:id', function (req, res){
    var doctor = getDocById(req.params.id);

    if(!doctor)
        res.send(400);
    else{
        doctor.name = req.body.name;
        res.send(200);
    }
});

const doctors: Array<any> = [
    {
        id: '1',
        name: 'Janek Cyjanek'
    },{
        id: '2',
        name: 'Mariusz Nowak'
    }
];

function getDocById(id){
    //return null;
    return _.find(doctors, d => d.id === id);
}


app.post('/login',(req: express.Request, res: express.Response) => {
    console.log(JSON.stringify(req.body));
    let user;
        mongo.findElement({
        login: req.body.login,
        password: req.body.password
    }, (result) => user = result)
    .then(() => setTimeout(() => {
            if (user[0]!= undefined) {
                res.json(user[0].role)
                console.log('tak');
            }
            else{
                res.json('bledny login lub haslo');
                console.log('nie');
                console.log(user);
        }}, 100));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});




// app.get('/remove', (req, res) => {
//     mongo.removeAllElements({imieniny: 'Ani'} ,(result) => res.send(result));
// })


// app.get('/up', (req, res: express.Response) => {
//     mongo.insertElements([{
//        imieniny: 'Ani',
//        cokolwiek: 'true ale msieszne',
//        kolejnyparam: 'taki super' 
//     }] ,(result) => res.send(result));
// });


// app.get('/movies', (req, res: express.Response) => {
//     mongo.showElements((result) => res.send(result));
// });