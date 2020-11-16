const express = require('express')
const mysql = require('mysql');
const mongo = require('mongodb');

const app = express()
const port = 5000
const client = new mongo.MongoClient(`mongodb+srv://Pioter:9898@mongodata.vvpkg.mongodb.net/Test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.use(express.json())


 app.get('/api/database', (req, res) => {
    client.connect(err => {
        if(err) return console.log('błąd')
        const db = client.db('Test')
        const namess = db.collection('TestColl')
      
      
           namess.find({}).toArray((err, nem) => {
              res.json(nem)
           })  
    })
    
 })

app.post('/api/provide/newData', (req, res) => {
    const front = req.body
    client.connect(err => {
        if(err) return console.log('błąd')
        const db = client.db('Test')
        const namess = db.collection('TestColl')
        namess.insertOne({
            
            name: front.name,
            location: front.location,
            money: front.money
        })
        
    })
    res.end()
})

app.post('/api/provide/changeData', (req, res) => {
    const front = req.body
    client.connect(err => {
        if(err) return console.log('błąd')
        const db = client.db('Test')
        const namess = db.collection('TestColl')
        namess.update
        (
            {
              _id:  mongo.ObjectID(front.id)
            },
            {
                $set :
                {
                  name: front.name,
                  location: front.location,
                  money: front.money

                }
            }
        )
        
    })
    console.log('zrobione')
    res.end()
})
app.post('/api/provide/deleteData', (req, res) => {
    console.log(req.body)
    client.connect(err => {
        if(err) return console.log('błąd')
        const db = client.db('Test')
        const namess = db.collection('TestColl')
        namess.deleteOne({_id:  mongo.ObjectID(req.body.id)})
        
        
    })
})





app.listen(port, () => {
    console.log("no cześć, to ja - serwer")
    
})
