import * as express from 'express';
import * as _ from 'lodash';
import * as bodyParser from 'body-parser';

const app = express();


app.use((req, res, next) => { 
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/doctors', (req: express.Request, res: express.Response) => {
    res.send(doctors);
});

app.get('/doctors/:id', function (req, res){
    var doctor = getDocById(req.params.id);

    if(doctor)
        res.send(doctor);
    else
        res.send(400);
});

app.put('/doctors/:id', function(req, res){
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


app.post('/log',(req: express.Request, res: express.Response) => {
    console.log(JSON.stringify(req.body));
    if (req.body.login === 'admin' && req.body.password === 'admin') {
        res.json('zalogowany')
          console.log('tak');
    }
    else{
        res.json('bledneHaslo');
          console.log('nie');
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
