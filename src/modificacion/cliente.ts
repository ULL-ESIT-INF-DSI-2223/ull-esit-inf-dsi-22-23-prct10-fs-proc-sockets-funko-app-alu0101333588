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


const client = net.createConnection({ port: 60500 }, () => {
  console.log("Conectado al servidor.");

  const comando = process.argv[2];
  const args = process.argv.slice(3).join(" ");

  client.write(JSON.stringify({ comando, args }));
});

client.on('data', (data) => {
  const response = JSON.parse(data.toString());

  if (response.error) {
    console.error(response.error);
  }

  console.log(response.result);
  client.end();
});

client.on('end', () => {
  console.log("Desconectado del servidor.");
});