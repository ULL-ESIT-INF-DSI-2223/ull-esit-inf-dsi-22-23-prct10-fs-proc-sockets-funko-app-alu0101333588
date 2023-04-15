import 'mocha';
import {expect} from 'chai';
import { Funko } from '../src/ejercicio3/Funko.js';
import { genero } from "../src/ejercicio3/genero.js";
import { tipoPop } from "../src/ejercicio3/tipoPop.js";
import { ColeccionFunkos } from "../src/ejercicio3/ColeccionFunkos.js";

describe('clase ColeccionFunkos', () => {
  it('objeto clase ColeccionFunkos', () => {
    expect(new ColeccionFunkos('test')).not.to.be.undefined
  })
})