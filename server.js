const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://henriquetrader92:51da2020@cluster0-416m3.mongodb.net/test?retryWrites=true"

MongoClient.connect(uri, (err, client) => {
  if(err) return console.log(err)
  db = client.db('test') // Coloque o nome do DB

  app.listen(3000, () => {
    console.log('Server runing on port 3000')
  })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.post('/show', (req,res) => {
    db.collection('data').save(req.body, (err, result) => {
        if(err) return console.log(err)

        console.log('Salvo no banco de dados...')
        res.redirect('/')
    })
})

app.set('view engine', 'ejs')