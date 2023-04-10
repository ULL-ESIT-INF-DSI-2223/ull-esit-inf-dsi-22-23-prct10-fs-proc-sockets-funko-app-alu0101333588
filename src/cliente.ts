import * as net from "net";
import { watchFile } from "fs"
import { Shell } from "./shell.js";


//const client = net.connect({port: 60300});

const client = net.createConnection({ port: 60300 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('ls -l');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});


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

client.on('end', () => {
  console.log('disconnected from server');
});

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
});*/