import graphqlHTTP from 'express-graphql'
import express from 'express'
import heroes from './src/schema'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '/public')))

app.use('/heroes', graphqlHTTP({schema: heroes, pretty: true}))
app.use('/graphql', graphqlHTTP({schema: heroes, graphiql: true}))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(3000, function () {
  console.log('Server on. Running on http://localhost:3000/')
})
