import chalk = require("chalk");
import {
    writeFileSync,
} from "node:fs";

/*export class Shell {
    private _comando : string;
    private _argumentos : string;
    private _salida : string;

    constructor (comando : string) {
        let dimension : number = comando.length;
        let ultima_posicion : number = 0;
        for (let i : number = 1; i < dimension && comando[i] != " "; i++) {
            this._comando += comando[i];
            ultima_posicion = i;
        }
        for (let i : number = ultima_posicion; i < dimension; i++) {
            this._argumentos += comando[i];
        }
    }

}*/