const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')

const heroes = require('./heroes/schema')

const app = express()

app.use(express.static(__dirname + '/public'));
app.use('/heroes', graphqlHTTP({schema:heroes, pretty: true}))
app.get('/', function (req,res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, function () {
  console.log('Server on.')
})
