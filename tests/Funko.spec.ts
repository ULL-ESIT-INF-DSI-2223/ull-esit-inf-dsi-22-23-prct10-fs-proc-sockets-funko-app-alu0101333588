import 'mocha';
import {expect} from 'chai';
import { Funko } from '../src/ejercicio3/Funko.js';
import { genero } from "../src/ejercicio3/genero.js";
import { tipoPop } from "../src/ejercicio3/tipoPop.js";
import { ColeccionFunkos } from "../src/ejercicio3/ColeccionFunkos.js";
import chalk = require("chalk");



describe("clase ColeccionFunkos", () => {

  let nombre_usuario : string = "usuario_prueba_test";
  let coleccionFunko1 : ColeccionFunkos = new ColeccionFunkos(nombre_usuario);
  let tipoAux : tipoPop = "Pop!" as tipoPop;
  let generoAux : genero = "Películas y TV" as genero;
  let numero : number = 346;

  let funko2 : Funko = {
    _ID: 368,
    _nombre: "The Child",
    _descripcion: "De la serie The Mandalorian",
    _tipo: tipoAux,
    _genero: generoAux,
    _franquicia: "Star Wars", 
    _numero: 2, 
    _exclusivo: false, 
    _caracteristicasEspeciales: "extremadamente adorable", 
    _valorMercado: 20
  };

  let funko3 : Funko = {
    _ID: 78435743857834758354,
    _nombre: "The Child",
    _descripcion: "De la serie The Mandalorian",
    _tipo: tipoAux,
    _genero: generoAux,
    _franquicia: "Star Wars", 
    _numero: 2, 
    _exclusivo: false, 
    _caracteristicasEspeciales: "extremadamente adorable", 
    _valorMercado: 20
  };
  
  it("anadir()", () => {
    expect(coleccionFunko1.anadir(funko2)).to.be.equal(chalk.green.bold(`Se ha añadido correctamente el funko ${funko2._nombre}`))
  });
  it("anadir()", () => {
    expect(coleccionFunko1.anadir(funko2)).to.be.equal(chalk.red.bold(`NO se ha podido añadir el funko, dado que el ID ${funko2._ID} ya existe`))
  });

  it("modificar()", () => {
    expect(coleccionFunko1.modificar(funko2)).to.be.equal(chalk.green.bold(`Se ha modificado correctamente el funko ${funko2._nombre}`))
  });
  it("modificar()", () => {
    expect(coleccionFunko1.modificar(funko3)).to.be.equal(chalk.red.bold(`NO se ha podido modificar el funko en cuestión dado que no existe ["${funko3._ID}"]`))
  });
  
  it("mostrar()", () => {
    expect(coleccionFunko1.mostrar(368)).to.be.equal(chalk.green.bold(`Se ha podido mostrar el funko en cuestión`))
  });

  it("mostrar()", () => {
    expect(coleccionFunko1.mostrar(numero)).to.be.equal(chalk.red.bold(`NO se ha podido mostrar el funko en cuestión dado que no existe ["${numero}"]`))
  });
  it("eliminar()", () => {
    expect(coleccionFunko1.eliminar(368)).to.be.equal(chalk.green.bold(`Se ha eliminado correctamente el funko con ID ${funko2._ID}`))
  });

  it("eliminar()", () => {
    expect(coleccionFunko1.eliminar(numero)).to.be.equal(chalk.red.bold(`NO se ha podido eliminar el funko en cuestión dado que no existe ["${numero}"]`))
  });

  
  
});