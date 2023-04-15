[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NApXvVde)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/node.js.yml)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101333588/actions/workflows/sonarcloud.yml)

###### Desarrollo de Sistemas Informáticos | Práctica 10 | Andrés Hernández Ortega

## Práctica 10 

# Introducción

En esta práctica continuaremos con las herramientas de GitHub Actions y Sonar Cloud. Además, introduciremos funcionalidades con los paquetes `yards` y `chalk` que nos posibilitarán introducir parametros durante la llamada a la ejecucción del programa y modificar el color y resaltado al imprimir por pantalla texto, así como, las funcionalidades que ofrece sockets para la conexión de un servidor con una serie de clientes, enviando y recibiendo información en ambas partes de las comunicaciones.

# Desarrollo

## Ejercicio 1

Considerando que se realizan dos modificaciones, primero una y después la otra:

#### Pila de llamadas

- Al comienzo está vacía

- Con la llamada a la función access():
    - access()

- Al ejecutar el callback de access() la pila está vacía.

- Al llamar al console.log queda:
    - console.log(`Starting to watch file ${filename}`);

- Al llamar a watch() queda:
    - watch()

- Al llamar watcher.on():
    - watcher.on()

- Al llamar al console.log():
    - console.log(`File ${filename} is no longer watched)

- Con la primera modificación:
    - watcher.on()
    - console.log(`File ${filename} has been modified somehow`);

- Con la segunda modificación:
    - watcher.on()
    - console.log(`File ${filename} has been modified somehow`);


#### Registro de eventos

- Al comienzo del todo está vacío

- Con la llamada a access queda:
    - access

- Con la llamada a watcher queda:
    - access
    - watcher

- Con la modificación de un archivo queda:
    - access
    - watcher
    - change

- Con la modificación de otro archivo queda:
    - access
    - watcher
    - change
    - change


#### Cola de manejadores

- Al comienzo del todo está vacío

- Con la llamada a access queda:
    - (err) =>
    - () =>

- Con la modificación de un archivo: 
    - (err) =>
    - () =>
    - () =>

- Con la modificación de un segundo archivo: 
    - (err) =>
    - () =>
    - () =>
    - () =>


## Ejercicio 2

Se ha posibilitado que el usuario introduzca un nombre de fichero con una serie de opciones posibles para mostrar el número de líneas, palabras, caracteres o combinar distintas opciones. Se ha llevado a cabo mediante el uso de yards para el paso de parametros en la llamada al programa, indicando la ruta del fichero y una o varias opciones, según desee. 

En la opción con Pipe se resuelve de la siguiente manera: 

```
const wc = spawn('wc', [argumentos, nombreFichero]);
wc.stdout.pipe(process.stdout);
```

Como podemos observar, se ejecuta el comando `wc` para contar el número de líneas, palabras y caracteres del fichero, cuya ruta se específica en la variable `nombreFichero` y los argumentos en `argumentos`.

Sin emplear Pipe se ha resuelto de esta forma:

```
const wc = spawn('wc', [nombreFichero]);

let wcOutput = '';
wc.stdout.on('data', (piece) => wcOutput += piece);   
    wc.on('close', () => {
    const wcOutputAsArray = wcOutput.split(/\s+/);
          
    if (argv.lineas) {
        console.log(`Hay ${wcOutputAsArray[0]} líneas`);
    }
    if (argv.caracteres) {
        console.log(`Hay ${wcOutputAsArray[2]} caracteres`);
    }

    if (argv.palabras) {
        console.log(`Hay ${wcOutputAsArray[1]} palabras`);
    }  
}); 
```

En el spawn no indicamos los argumentos que son en cuestión (`-l`, `-w`, `c`) sino que empleamos el comando `wc` directamente y en función de las opciones que se muestra por pantalla empleando simples `console.log`.

## Ejercicio 3

Partiendo de la base de la anterior práctica establecemos un servidor que reciba una de las distintas opciones posibles (añadir nuevo usuario, añadir funko, modificar funko, eliminar funko, mostrar información de un funko en concreto o listar los funkos de un usuario) y un programa cliente que se podrá ejecutar varias veces, es decir, se tiene un servidor y se podrán establecer diferentes clientes.

El cliente recibe por parte del usuario por línea de comandos a la hora de la llamar al programa las opciones que desea realizar, empleando `yards` para ello, acto seguido el cliente lo convierte en una petición que realiza al servidor y que recibirá una respuesta por parte de éste que el cliente comunicará por pantalla al usuario. Por tanto, el usuario interactúa directamente con el cliente, sin tener relación directa con el servidor, pero sí obviamente de manera indirecta.

### Servidor

El servidor se encuentra en un estado de escucha en el puerto `60500` esperando la conexión de clientes.

```
servidor.listen(60500, () => {
    console.log("Esperando clientes...");
});
```

Cuando recibe la comunicación de un nuevo cliente notifica por pantalla que un cliente se ha conectado y procesa la información que éste le envía, en esta caso se envía una petición:

```
console.log("Un cliente se ha conectado");
let funkoPops: Funko[] = [];
let mensajeEntrante = '';
let informacionPeticion : informacion;
conexion.on('data', (chunk) => {
    mensajeEntrante += chunk;
    const mensajeRecibido = JSON.parse(chunk.toString());
    informacionPeticion= mensajeRecibido.peticion;
    conexion.emit(informacionPeticion.accion);
});
```

La petición que recibe el servidor contiene el nombre del usuario sobre el que se desea realizar las gestiones, opcional un id que corresponde con el del funko, la acción que desea realizar (añadir nuevo usuario, añadir funko, modificar funko, eliminar funko, mostrar información de un funko en concreto o listar los funkos de un usuario) y, opcionalmente, un objeto de tipo funko.

```
nombreUsuario: string;
id?: number;
accion: acciones;
funko?: Funko;
```
Las distinas opciones que recibe se detectan mediante `conexion.emit(informacionPeticion.accion)`, comentado anteriormente, seguido de distintas `conexion.on` en función de la acción que haya indicado el cliente. En este caso, podemos observar como `nuevoUsuario` llama al constructor de un objeto de tipo `ColeccionFunkos` con el nombre del usuario en cuestión, para que éste se encargue de crear un directorio para el usuario, en caso de que no esté ya, y se retorna que la operación ha tenido éxito, mediante un mensaje de tipo JSON, dando por finalizado el envío de información por parte del servidor.

```
conexion.on('nuevoUsuario', () => {
    console.log('Acción añadir nuevo USUARIO');
    let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
    conexion.write(JSON.stringify({'operacion': 'exito'}));
    conexion.end();
});
```

Al detectar la perdida de conexión con el cliente, mediante un `close` se indica que se ha desconectado el cliente, volviendo a esperar a la conexión de nuevos clientes.

```
conexion.on('close', () => {
    console.log("¡Un cliente se ha desconectado!");
});
```

### Cliente

El cliente comienza su ciclo de ejeccución recibiendo por parte del usuario, en línea de comandos la información sobre qué se acción se desea realizar.

En este fragmento de código vemos la opción para añadir un nuevo usuario, `nuevoUsuario`, en la que el usuario introduce el nombre del usuario en cuestión, rellenando el cliente la información de la petición con el nombre de usuario proporcionado por el ususario y la acción a realizar, que en este caso es `nuevoUsuario`, que cuando establezcamos conexión con el servidor enviaremos en la petición.

```
yargs(hideBin(process.argv))
  .command(
    "nuevoUsuario",
    "Añadir un nuevo usuario",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
        informacionPeticion = {nombreUsuario: argv.nombreUsuario, accion: 'nuevoUsuario'};
    }
  )
```

El cliente establece una conexión con el servidor en el puerto `60500`, enviando un mensaje de tipo JSON con la información de la petición en cuestión que, como ya hemos comentado, contiene el nombre del usuario sobre el que se desea realizar las gestiones, opcional un id que corresponde con el del funko, la acción que desea realizar (añadir nuevo usuario, añadir funko, modificar funko, eliminar funko, mostrar información de un funko en concreto o listar los funkos de un usuario) y, opcionalmente, un objeto de tipo funko.

```
const cliente = net.connect({port: 60500}, () => {
    cliente.write(JSON.stringify({'peticion': informacionPeticion}));
});
```

Acto seguido, capturamos la respuesta por parte del servidor:

```
let respuesta = '';
cliente.on('data', (chunk) => {
    respuesta += chunk;
});
```

El cliente la procesa en función de sí el servidor ha retornado que la operación ha realizar ha tenido éxito o error:

```
cliente.on('end', () => {
  const mensajeRecibido = JSON.parse(respuesta);
  const respuestaAuxiliar = mensajeRecibido.operacion;
  if(mensajeRecibido.operacion === 'error') {
    console.log(chalk.bold.red(`La operación ${informacionPeticion.accion} NO se ha podido realizar`));
  }
  else {
    console.log(chalk.bold.green(`La operación ${informacionPeticion.accion} se ha realizado de manera exitosa`));

    if (informacionPeticion.accion == 'mostrar' || informacionPeticion.accion == 'listar') {
        for (let i = 0; i < mensajeRecibido.funkos.length; i++) {
            console.log(`**** ID: ${mensajeRecibido.funkos[i]._ID}`);
            console.log(`Nombre: ${mensajeRecibido.funkos[i]._nombre}`);
            console.log(`Descripción: ${mensajeRecibido.funkos[i]._descripcion}`);
            console.log(`Tipo: ${mensajeRecibido.funkos[i]._tipo}`);
            console.log(`Género: ${mensajeRecibido.funkos[i]._genero}`);
            console.log(`Franquicia: ${mensajeRecibido.funkos[i]._franquicia}`);
            console.log(`Número: ${mensajeRecibido.funkos[i]._numero}`);
            console.log(`Exclusivo: ${mensajeRecibido.funkos[i]._exclusivo}`);
            console.log(`Características especiales: ${mensajeRecibido.funkos[i]._caracteristicasEspeciales}`);
            rangoValoresMercado(mensajeRecibido.funkos[i]._valorMercado);
            console.log(`****`);
        }
    }
  }
})
```

Si ha habido un error se notifica empleando `chalk`, en caso contrario, se notifica con un mensaje de éxito o, en su caso, con la información solicitada por parte del usuario.


# Conclusión

Como hemos comentado en esta práctica nos hemos podido introducir en nuevos conceptos y herramientas para que los usuarios interactúen con los programas de distintas formas y mostrar por consola los textos con distintas tonalidades y manera de resaltar. A su vez, con las maneras de intercambiar información y paquetes de información, desde tipo JSON como mensajes de textos normales y corrientes, entre un programa que emula a un servidor y otros que lo hacen como clientes. 



# Referencias

Para el desarrollo de la práctica se ha requerido la consulta de los siguientes recursos:

- https://frikily.com/cuanto-vale-mi-funko-pop/
- https://www.npmjs.com/package/yargs
- https://www.npmjs.com/package/chalk
- https://www.npmjs.com/package/jsonfile
- https://www.npmjs.com/package/@types/node
- https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/fs/promises.d.ts
- https://nodejs.org/docs/latest-v19.x/api/fs.html#synchronous-api