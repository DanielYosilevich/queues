const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./apollo/typedefs')
const { resolvers } = require('./apollo/resolvers')

const app = express()

app.use(express.static('public'))

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.json())

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// app.get('/[^\.]+$', function (req, res) {
//   res.set('Content-Type', 'text/html')
//     .sendFile(path.join(__dirname, '/public/index.html'));
// });

server.applyMiddleware({ app });
app.get('/', (req, res) => res.send('Yo!'))
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Apollo server ready at port ${PORT}${server.graphqlPath}`))
