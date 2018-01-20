//Load file system manager
var fs = require('fs'); //File system manager

//Load flexible database interface
var graphql = require('graphql').graphql;
var buildSchema = require('graphql').buildSchema;

var schema, root, secureSockets, unsecureSockets;

var init = function () {
    //Build up the database schema
    var schema = buildSchema(`
        type Query {
            hello: String
        }
    `);

    //Set up the database root
    var root = { hello: () => 'Hello world!' };

    testMessage();
};

var bindSio = function (io) {
    secureSockets = io.sockets;
    bind(io);
};

var bindIo = function (io) {
    unsecureSockets = io.sockets;
    bind(io);
};

var bind = function (io) {
    var request = io.on('connection', function (socket) {
    });
    console.log("IO bound to Database");
};

var testMessage = function () {
    //make a request
    graphql(schema, '{ hello }', root).then((response) => {
        console.log(response);
    });
};

init();

exports.bindIo = bindIo;
exports.bindSio = bindSio;