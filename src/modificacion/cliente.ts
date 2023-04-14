import * as net from "net";
import { watchFile } from "fs"
//import { Shell } from "./shell.js";

/*

//const client = net.connect({port: 60300});


//const client = net.createConnection({ port: 60300 }, () => {
  // 'connect' listener.
  
//});

const client = net.createConnection({ port: 60300 }, () => {
  console.log('Conexión con el servidor');
  //client.write('ls');
  client.end();
});


/*client.on('data', (data) => {
  console.log(data);
  client.end();
});*/


/*client.on('data', (dat aJSON) => {
  const message = JSON.parse(dataJSON.toString());

  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'change') {
    console.log('File has been modified.');
    console.log(`Previous size: ${message.prevSize}`);
    console.log(`Current size: ${message.currSize}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});*/





/*
client.on('data', (dataJSON) => {
  const message = JSON.parse(dataJSON.toString());

  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'change') {
    console.log('File has been modified.');
    console.log(`Previous size: ${message.prevSize}`);
    console.log(`Current size: ${message.currSize}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});
*/

const client = net.connect({port: 60300});

client.write(JSON.stringify({'message': 'Hello world!'}));
client.end();

let myResponse = '';
client.on('data', (chunk) => {
  myResponse += chunk;
});

client.on('end', () => {
  const myObject = JSON.parse(myResponse);
  console.log(myObject.message);
});