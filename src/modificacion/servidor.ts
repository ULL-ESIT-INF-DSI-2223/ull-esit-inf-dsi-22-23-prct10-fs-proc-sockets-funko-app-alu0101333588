import * as net from "net";
import { watchFile } from "fs";
import {spawn} from 'child_process';

import { exec } from "child_process";


/*
const server = net.createServer((connection) => {
  // The connection object is emitted when a new connection is made
  // It is the socket object
  console.log(connection); 
});

server.listen(60300);



if (process.argv.length > 0) {
  console.log("Por favor, introduce un comando");
} else {
    const readable = getReadableStreamSomehow();
    readable.setEncoding('utf8');
    readable.on('data', (chunk) => {
    assert.equal(typeof chunk, 'string');
    console.log('Got %d characters of string data:', chunk.length);
    }); 
    
   
  net.createServer({allowHalfOpen:true}, (connection) => {
    console.log('Se ha establecido conexión con un cliente');   

    let argumento : string = "";
    // recibe el dato, lo imprime en pantalla
    connection.on('data', (data) => {
      console.log(`ARGUMENTO:`, data.toString());
      argumento = data.toString();
      connection.end();
    });

    
    let comando = "";
    connection.on('data', (dataChunk) => {
      comando += dataChunk;
    }); 
    connection.on('close', (code : string) => {
      console.log(`child process exited with code ${code}`);
    });
    
    const situComando = spawn("ls");
    situComando.on('error', (err) => {
      console.error('Comando introducido no valido');
    });
    
    situComando.stderr.on('data', (data : string) => {
      console.error(`stderr: ${data}`);
    });
    situComando.stdout.on('data', (data : string) => {
      console.log(`stdout: ${data}`);
    });

    

    situComando.on('close', (code : string) => {
      console.log(`FINAL DEL PROCESO HIJO ${code}`);
    }); 

    //const fileName = process.argv[2];
    watchFile("prueba.txt", (curr, prev) => {
      connection.write(JSON.stringify({
        'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
         '\n');
      //connection.write(JSON.stringify(situComando));
    });

    
    connection.on('end', () => {
      console.log('Un cliente se ha desconectado.');
    });

    // - ChildProcess
    // - spawn 

    // ¿ request ?
    // import {request} from "http";
    // const url = "..."; 
    // ¿qué es la URL?, ¿para qué sirve?
    

    // EN EL CLIENTE:
    // sudo apt install lynx
    // lynx localhost PUERTO

    // ¿ Insertar imágenes en Documentación GitHub ?
    // ¿ Cómo serían los tests ?


}).listen(60300, () => {
  console.log('Esperando clientes para conectar...');
});

*/


const servidor = net.createServer((conexion) => {
  console.log("Un cliente se ha conectado");

  conexion.on('data', (data) => {
    const { comando, args } = JSON.parse(data.toString());

    console.log(`Ejecutando comando: ${comando} ${args}`);

    exec(`${comando} ${args}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`el error es: ${error}`);
        conexion.write(JSON.stringify({ error: error.message }));
        return;
      }

      if (stderr) {
        conexion.write(JSON.stringify({ error: stderr }));
        return;
      }

      conexion.write(JSON.stringify({ result: stdout }));
    });
  });

  conexion.on('close', () => {
    console.log("Un cliente se ha desconectado");
  });

});

servidor.listen(60500, () => {
  console.log("Esperando clientes...");
});


