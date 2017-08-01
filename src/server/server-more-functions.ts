// app.get('/up', (req, res: express.Response) => {
//     mongo.insertElements([{
//         login: 'doktorek',
//         password: 'prawilny',
//         role: 'doctor',
//     },
//     {
//         login: 'doktorBezUprawnien',
//         password: 'jakRowerzystaBezUprawnien',
//         role: 'doctor'
//     },
//     {
//         login: 'Brooke',
//         password: '1234',
//         role: 'doctor'
//     }] ,(result) => res.send(result));
// });


// app.get('/up', (req, res: express.Response) => {
//     mongo.insertElements([{
//         login: 'doktorek',
//         specialization: 'od uszów',
//         city: 'Masecziuset'
//     },
//     {
//         login: 'doktorBezUprawnien',
//         specialization: 'kości',
//         city: 'Miasto W'
//     },
//     {
//         login: 'Brooke',
//         specialization: 'internista',
//         city: 'Caracas'
//     }] , (result) => res.send(result));
// });






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


// app.get('/detale', (req, res: express.Response) => {
//     mongo.showElements((result) => res.send(result));
// });





// app.get('/doctors', (req: express.Request, res: express.Response) => {
//     res.send(doctors);
// });

// app.get('/doctors/:id', function (req, res){
//     var doctor = getDocById(req.params.id);

//     if (doctor) 
//         res.send(doctor);
//     else
//         res.send(400);
// });

// app.put('/doctors/:id', function (req, res){
//     var doctor = getDocById(req.params.id);

//     if(!doctor)
//         res.send(400);
//     else{
//         doctor.name = req.body.name;
//         res.send(200);
//     }
// });

// const doctors: Array<any> = [
//     {
//         id: '1',
//         name: 'Janek Cyjanek'
//     },{
//         id: '2',
//         name: 'Mariusz Nowak'
//     }
// ];

// function getDocById(id){
//     //return null;
//     return _.find(doctors, d => d.id === id);
// }



// //DOCTORS TO COLLECTION USERS
// app.get('/up', (req, res: express.Response) => {
//     mongoUsers.insertElements([{
//         login: 'doktorek',
//         password: 'prawilny',
//         role: 'doctor',
//     },
//    ,
//     ] ,(result) => res.send(result));
// });