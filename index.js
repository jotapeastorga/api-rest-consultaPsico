const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://zeus:tsMKKLTeZjfE5eg@cluster0.kv1sh.mongodb.net/psistaging?retryWrites=true&w=majority';

//psistaging

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('psistaging')
        const quotesCollection = db.collection('paciente')



        app.get('/pacientes', (req, res) => {
            db.collection('paciente').find().toArray()
                .then(results => {
                    //console.log(results)
                    res.send(results);

                })
                .catch(error => console.error(error))
        })


        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
        })
        //app.listen(/* ... */)

    })
    .catch(error => console.error(error))



app.listen(3000, function () {
    console.log('listening on 3000')
})


app.get('/', function (req, res) {
    res.send('Hello Worldss')
})

app.post('/quotes', (req, res) => {
    res.send('post')
})