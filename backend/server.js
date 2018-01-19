var port = 8080;
var securePort = 8443;

//Load minimalistic web framework
var express = require('express');
var app = express();

//Load file system manager
var fs = require('fs'); //File system manager

//Load flexible database interface
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//Make an http web server
var http = require('http').createServer(app);

//Load ssl keys and make an https web server
var privateKey = fs.readFileSync('sslcert/nopass.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var https = require('https').createServer(credentials, app);

//Serve all static files in the 'frontend' folder
app.use(express.static('frontend'));

//Make unsecure website available
http.listen(port, () => console.log('listening on', port));

//Make secure website available
https.listen(securePort, () => console.log('listening securely on', securePort));