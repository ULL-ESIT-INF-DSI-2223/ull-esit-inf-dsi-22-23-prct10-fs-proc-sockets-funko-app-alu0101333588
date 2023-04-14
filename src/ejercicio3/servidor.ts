import { Funko } from "./Funko.js";
import { ColeccionFunkos } from "./ColeccionFunkos.js";
import * as net from "net";
import { informacion } from './cliente.js';

const servidor = net.createServer((conexion) => {
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
    

    conexion.on('nuevoUsuario', () => {
        console.log('Acción añadir nuevo USUARIO');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        conexion.write(JSON.stringify({'operacion': 'exito'}));
        conexion.end();
    });

    conexion.on('anadir', () => {
        console.log('Acción AÑADIR nuevo Funko');
        const mensaje = JSON.parse(mensajeEntrante);
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        if (informacionPeticion.funko) {
            if(coleccionfunkos1.anadir(informacionPeticion.funko)) {
                conexion.write(JSON.stringify({'operacion': 'exito'}));
            } else {
                conexion.write(JSON.stringify({'operacion': 'error'}));
            }    
        }
        conexion.end();
    });

    conexion.on('modificar', () => {
        console.log('Acción MODIFICAR Funko');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        if (informacionPeticion.funko) {
            if(coleccionfunkos1.modificar(informacionPeticion.funko)) {
                conexion.write(JSON.stringify({'operacion': 'exito'}));
            } else {
                conexion.write(JSON.stringify({'operacion': 'error'}));
            }    
        }
        conexion.end();
    });

    conexion.on('eliminar', () => {
        console.log('Acción ELIMINAR Funko');
        const mensaje = JSON.parse(mensajeEntrante);
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        if (informacionPeticion.id) {
            if(coleccionfunkos1.eliminar(informacionPeticion.id)) {
                conexion.write(JSON.stringify({'operacion': 'exito'}));
            } else {
                conexion.write(JSON.stringify({'operacion': 'error'}));
            }    
        }
        conexion.end();
    });

    conexion.on('listar', () => {
        console.log('Acción LISTAR Funko');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        
        
        let funkos : Funko[] = coleccionfunkos1.arrayFunkos();
        
        if (funkos.length === 0) {
            conexion.write(JSON.stringify({'operacion': 'error'}));
        } else {
            conexion.write(JSON.stringify({'operacion': 'exito', 'funkos': funkos}));  
        }

        
        conexion.end();
    });

    conexion.on('mostrar', () => {
        console.log('Acción MOSTRAR Funko');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(informacionPeticion.nombreUsuario);
        

        if (informacionPeticion.id) {
            let funkos : Funko[] = [coleccionfunkos1.obtenerFunko(informacionPeticion.id)];
            if (coleccionfunkos1.existeFunko(informacionPeticion.id)) {
                conexion.write(JSON.stringify({'operacion': 'exito', 'funkos': funkos}));
            } else {
                conexion.write(JSON.stringify({'operacion': 'error'}));
            }  
        }
        
        conexion.end();
    });
     
    conexion.on('close', () => {
        console.log("¡Un cliente se ha desconectado!");
    });

});

servidor.listen(60500, () => {
    console.log("Esperando clientes...");
});

