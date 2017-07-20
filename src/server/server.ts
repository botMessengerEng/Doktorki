import * as express from 'express';
import * as _ from 'lodash';

const app = express();
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

var doctors: Array<any> = [
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


app.post('/log',(req, res) => {
    if (req.body === 'admin')
        res.send('zalogowany')
    else
        res.send('bledneHaslo');
});
