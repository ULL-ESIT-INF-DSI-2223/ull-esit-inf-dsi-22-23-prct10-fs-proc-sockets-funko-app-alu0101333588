import * as net from "net";
import { watchFile } from "fs";
import { Shell } from "./interface.js";


/*const server = net.createServer((connection) => {
  // The connection object is emitted when a new connection is made
  // It is the socket object
  console.log(connection);
});

server.listen(60300);*/



/*if (process.argv.length > 0) {
  console.log("Por favor, introduce un comando");
} else {*/
    /*const readable = getReadableStreamSomehow();
    readable.setEncoding('utf8');
    readable.on('data', (chunk) => {
    assert.equal(typeof chunk, 'string');
    console.log('Got %d characters of string data:', chunk.length);
    }); */
    
    
  net.createServer({allowHalfOpen }, (connection) => {
    console.log('Se ha establecido conexión con un cliente');   
    connection.allowHalfOpen = true;
    let argumento : string = "";
    // recibe el dato, lo imprime en pantalla
    connection.on('data', (data) => {
      console.log(`ARGUMENTO:`, data.toString());
      argumento = data.toString();
      connection.end();
    });
    
    let shell1 : Shell = new Shell(argumento);

    let prueba1 : Prueba = { _ejemplo : "valee" };

    // envía respuesta
    let fileName : string = "salida.json";
    connection.write(JSON.stringify(prueba1, null, 2));
    //connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) + '\n');

    /*watchFile(fileName, (curr, prev) => {
      connection.write(JSON.stringify({
        'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
         '\n');
    });*/

    watchFile(fileName, (curr, prev) => {
      connection.write(JSON.stringify(shell1, null, 2));
    });

  connection.on('end', () => {
    console.log('Un cliente se ha desconectado.');
  });

  }).listen(60300, () => {
    console.log('Esperando clientes para conectar...');
  });
//}
