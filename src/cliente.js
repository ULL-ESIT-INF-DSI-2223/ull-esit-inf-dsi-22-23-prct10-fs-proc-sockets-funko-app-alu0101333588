"use strict";
exports.__esModule = true;
var net = require("net");
var client = net.connect({ port: 60300 });
client.on('data', function (dataJSON) {
    var message = JSON.parse(dataJSON.toString());
    if (message.type === 'watch') {
        console.log("Connection established: watching file ".concat(message.file));
    }
    else if (message.type === 'change') {
        console.log('File has been modified.');
        console.log("Previous size: ".concat(message.prevSize));
        console.log("Current size: ".concat(message.currSize));
    }
    else {
        console.log("Message type ".concat(message.type, " is not valid"));
    }
});
