[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NApXvVde)

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

- Con la llamada a watch queda:
    - access
    - watch

- Con la modificación de un archivo queda:
    - access
    - watch
    - change

- Con la modificación de otro archivo queda:
    - access
    - watch
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


# Ejercicio 2