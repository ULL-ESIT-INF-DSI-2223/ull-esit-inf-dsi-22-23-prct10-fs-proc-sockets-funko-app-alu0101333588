import {watchFile} from 'fs';
import {spawn} from 'child_process';
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { verify } from 'crypto';
import { access, constants } from 'fs';


let nombreFichero : string = '';


yargs(hideBin(process.argv))

  .command(
    "wc",
    "Saber el número de líneas",
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

      access(nombreFichero, constants.F_OK, (err) => {
  
        if (err) {
      
          console.error(err.message);
      
        } else {
      
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
        }
      
      });

    }
  )

  .help().argv;
  
