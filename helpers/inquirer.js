const inquirer = require("inquirer");
require("colors");

//--objeto que contiene el listado de preguntas a mostrar al usuario.
const preguntas = [
   {  
      type: "list",  //*tipo lista 
      name: "opcion", //*nombre de la salida elegida por el usuario
      choices: [
         {
            name: `${'1'.green}. Crear tarea`,  //*valor a imprimir en pantalla
            value: 1,  //* resultado de la elección, será el valor retornado en el objeto "opcion"
         },
         {
            name: `${'2'.green}. Ver tareas`,
            value: 2,
         },
         {
            name: `${'3'.green}. Ver tareas completadas`,
            value: 3,
         },
         {
            name: `${'4'.green}. Ver tareas pendientes`,
            value: 4,
         },
         {
            name: `${'5'.green}. Completar tarea(s)`,
            value: 5,
         },
         {
            name: `${'6'.green}. Borrar tarea`,
            value: 6,
         },
         {
            name: `${'0'.green}. Salir`,
            value: 0
         },
      ],
      message: "¿Qué desea hacer?",
   },
];

const inquirerMenu = async () => {
   console.clear();
   console.log("==================================".yellow);
   console.log("       Seleccione una opción       ".green);
   console.log("==================================\n".yellow);

   //-- se llama a la función que imprime el menú y se desestructura para obtener 
   //--solo el valor de interés y no todo el objeto
   let { opcion } = await inquirer.prompt(preguntas); //-- opcion es el name que se puso en la variable preguntas
   //*se retorna el value elegido por el usuario
   return opcion;
};

const inquirerPause = async () => {
   const pause = [
      {
         type: "input",
         message: `Presione ${"ENTER".green} para continuar: \n`,
         name: "pause",
      }
   ];
   //salto de línea para separar la información en pantalla
   console.log('\n')
   await inquirer.prompt(pause);
};

module.exports = {
   inquirerMenu,
   inquirerPause,
};
