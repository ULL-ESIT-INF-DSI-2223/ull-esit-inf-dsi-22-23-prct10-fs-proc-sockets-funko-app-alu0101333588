import {watchFile} from 'fs';
import {spawn} from 'child_process';
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { verify } from 'crypto';
import { access, constants } from 'fs';

let argumentos : string = '';
let nombreFichero : string = '';

yargs(hideBin(process.argv))

  .command(
    "wc",
    "Saber número de líneas, caracteres y palabras de un documento, según se específiquen opciones",
    {
      ruta: {
        description: "Nombre del archivo",
        type: "string",
        demandOption: true,
      },
      lineas: {
        description: "Número de líneas",
        demandOption: false,
      },
      palabras: {
        description: "Número de palabras",
        demandOption: false,
      },
      caracteres: {
        description: "Número de caracteres",
        demandOption: false,
      }
    },
    (argv) => {
      nombreFichero = argv.ruta;

      if (argv.lineas || argv.caracteres || argv.palabras) {
        argumentos = "-";
      }

      if (argv.lineas) {
        argumentos += "l";
      }

      if (argv.caracteres) {
        argumentos += "c";
      }

      if (argv.palabras) {
        argumentos += "w";
      }
    
    }
  )

  .help().argv;
  


access(nombreFichero, constants.F_OK, (err) => {
  
  if (err) {

    console.error(err.message);

  } else {

    const wc = spawn('wc', [argumentos, nombreFichero]);
    wc.stdout.pipe(process.stdout);

  }

});