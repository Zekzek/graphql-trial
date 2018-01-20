//Load file system manager
var fs = require('fs'); //File system manager

//Load flexible database interface
var graphql = require('graphql').graphql;
var buildSchema = require('graphql').buildSchema;

//Build up the database schema
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

//Set up the database root
var root = { hello: () => 'Hello world!' };

var bindSio = (io) => {
    secureSockets = io.sockets;
    bind(io);
};

var bindIo = (io) => {
    unsecureSockets = io.sockets;
    bind(io);
};

//Handle socket.io messaging 
var bind = (io) => {
    var request = io.on('connection', (socket) => {
        //Handle all requests
        socket.on('database-request', (request) => {
            graphql(schema, request, root).then((response) => {
                console.log('Responding to', request, 'with', response);
                socket.emit('database-response', response);
            });
        });
    });
    console.log("IO bound to Database");
};

exports.bindIo = bindIo;
exports.bindSio = bindSio;