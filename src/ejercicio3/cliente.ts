import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Funko } from "./Funko.js";
import { rangoValoresMercado } from "./ColeccionFunkos.js";
import chalk = require("chalk");
import { genero } from "./genero.js";
import { tipoPop } from "./tipoPop.js";
import * as net from "net";


export type acciones = 'nuevoUsuario' | 'anadir' | 'modificar' | 'eliminar' | 'listar' | 'mostrar';

export type informacion = {
    nombreUsuario: string;
    id?: number;
    accion: acciones;
    funko?: Funko;
}

let informacionPeticion : informacion;

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

  .command(
    "anadir",
    "Añadir funko",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del funko",
        type: "number",
        demandOption: true,
      },
      nombre: {
        description: "Nombre del funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo de funko",
        type: "string",
        demandOption: true,
      },
      genero: {
        description: "Género del funko",
        type: "string",
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia a la que pertenece el funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "número de funko, en la franquicia",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "Si es exclusivo o no",
        type: "boolean",
        demandOption: true,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del funko",
        type: "string",
        demandOption: true,
      },
      valorMercado: {
        description: "Valor del mercado del funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      let tipoAux: tipoPop = argv.tipo as tipoPop;
      let generoAux: genero = argv.genero as genero;
      let funko1: Funko = {
        _ID: argv.id,
        _nombre: argv.nombre,
        _descripcion: argv.descripcion,
        _tipo: tipoAux,
        _genero: generoAux,
        _franquicia: argv.franquicia,
        _numero: argv.numero,
        _exclusivo: argv.exclusivo,
        _caracteristicasEspeciales: argv.caracteristicasEspeciales,
        _valorMercado: argv.valorMercado,
      };
      informacionPeticion = {nombreUsuario: argv.nombreUsuario, id: argv.id, accion: 'anadir', funko: funko1};
    }
  )

  .command(
    "modificar",
    "Modificar funko",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del funko",
        type: "number",
        demandOption: true,
      },
      nombre: {
        description: "Nombre del funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo de funko",
        type: "string",
        demandOption: true,
      },
      genero: {
        description: "Género del funko",
        type: "string",
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia a la que pertenece el funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "número de funko, en la franquicia",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "Si es exclusivo o no",
        type: "boolean",
        demandOption: true,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del funko",
        type: "string",
        demandOption: true,
      },
      valorMercado: {
        description: "Valor del mercado del funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      let tipoAux: tipoPop = argv.tipo as tipoPop;
      let generoAux: genero = argv.genero as genero;
      let funko1: Funko = {
        _ID: argv.id,
        _nombre: argv.nombre,
        _descripcion: argv.descripcion,
        _tipo: tipoAux,
        _genero: generoAux,
        _franquicia: argv.franquicia,
        _numero: argv.numero,
        _exclusivo: argv.exclusivo,
        _caracteristicasEspeciales: argv.caracteristicasEspeciales,
        _valorMercado: argv.valorMercado,
      };
      informacionPeticion = {nombreUsuario: argv.nombreUsuario, id: argv.id, accion: 'modificar', funko: funko1};
    }
  )

  .command(
    "eliminar",
    "Eliminar funko",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
        informacionPeticion = {nombreUsuario: argv.nombreUsuario, id: argv.id, accion: 'eliminar'};
    }
  )

  .command(
    "listar",
    "Lista de funkos",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
        informacionPeticion = {nombreUsuario: argv.nombreUsuario, accion: 'listar'};
    }
  )

  .command(
    "mostrar",
    "Mostrar características de un funko",
    {
      nombreUsuario: {
        description: "Nombre del usuario",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {

      informacionPeticion = {nombreUsuario: argv.nombreUsuario, id: argv.id, accion: 'mostrar'};

    }
  )

  .help().argv;



const cliente = net.connect({port: 60500}, () => {
    cliente.write(JSON.stringify({'peticion': informacionPeticion}));
});


let respuesta = '';
cliente.on('data', (chunk) => {
    respuesta += chunk;
});

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