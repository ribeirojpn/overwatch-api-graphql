import graphqlHTTP from 'express-graphql'
import express from 'express'
import heroes from './heroes/schema'

const app = express()

app.use(express.static(__dirname + '/public'));

app.use('/heroes', graphqlHTTP({schema: heroes, pretty: true}))
app.use('/graphql', graphqlHTTP({schema: heroes, graphiql: true}))
app.get('/', function (req,res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, function () {
  console.log('Server on.')
})
