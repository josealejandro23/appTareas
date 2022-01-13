const inquirer = require("inquirer");
require("colors");

//--objeto que contiene el listado de preguntas a mostrar al usuario.
const preguntas = [
   {
      type: "list", //*tipo lista
      name: "opcion", //*nombre de la salida elegida por el usuario
      choices: [
         {
            name: `${"1".green}. Crear tarea`, //*valor a imprimir en pantalla
            value: 1, //* resultado de la elección, será el valor retornado en el objeto "opcion"
         },
         {
            name: `${"2".green}. Ver tareas`,
            value: 2,
         },
         {
            name: `${"3".green}. Ver tareas completadas`,
            value: 3,
         },
         {
            name: `${"4".green}. Ver tareas pendientes`,
            value: 4,
         },
         {
            name: `${"5".green}. Completar tarea(s)`,
            value: 5,
         },
         {
            name: `${"6".green}. Borrar tarea`,
            value: 6,
         },
         {
            name: `${"0".green}. Salir`,
            value: 0,
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
      },
   ];
   //salto de línea para separar la información en pantalla
   console.log("\n");
   await inquirer.prompt(pause);
};

const imprimirMensaje = async (mensaje) => {
   let question = [
      {
         type: "input",
         name: "valor",
         message: mensaje,
         validate(value) {
            if (value.length === 0) return "Debe introducir un valor";
            return true;
         },
      },
   ];

   const { valor } = await inquirer.prompt(question);
   return valor;
};

const listadoTareasBorrar = async (tareas = []) =>{
   //--Se crea un arreglo con map, map genera un arreglo con un objeto por cada elemento en el arreglo original, en este caso tareas
   const choices = tareas.map((tarea,i)=>{
      const idx = `${i+1}.`.green;

      //--se crea un objeto con la forma requerida por inquirer para mostrar las tareas y retornar el id de la tarea seleccionada
      return{
         value: tarea.id,
         name: `${idx} ${tarea.descripcion}`
      }
   });

   choices.unshift({
      value:'0',
      name:'0.'.green + 'Cancelar'
   });

   //--se crea el objeto pregunta y se le pasa el listado de opciones creadas en el paso anterior
   const preguntas = [
      {
         type:'list',
         name:'id',
         message:'Borrar',
         choices
      }
   ];
   //-- se imprime la pregunta y se obtiene el resultado
   const {id} = await inquirer.prompt(preguntas);
   return id;
}

const confirmarAccion = async ( mensaje ) =>{
   const question =[
      {
         type:'confirm',
         name: 'bRes',
         message:mensaje
      }
   ];

   const {bRes} = await inquirer.prompt(question);
   return bRes;
}

const listadoTareasCompletar = async (tareas = []) => {
   //--Se crea un arreglo con map, map genera un arreglo con un objeto por cada elemento en el arreglo original, en este caso tareas
   const choices = tareas.map((tarea, i) => {
      const idx = `${i + 1}.`.green;

      //--se crea un objeto con la forma requerida por inquirer para mostrar las tareas y retornar el id de la tarea seleccionada
      return {
         value: tarea.id,
         name: `${idx} ${tarea.descripcion}`,
         checked : tarea.finalizadaEn ? true : false
      };
   });

   //--se crea el objeto pregunta y se le pasa el listado de opciones creadas en el paso anterior
   const preguntas = [
      {
         type: "checkbox",
         name: "ids",
         message: "Seleccionar",
         choices,
      },
   ];
   //-- se imprime la pregunta y se obtiene el resultado
   const { ids } = await inquirer.prompt(preguntas);
   return ids;
};

module.exports = {
   inquirerMenu,
   inquirerPause,
   imprimirMensaje,
   listadoTareasBorrar,
   confirmarAccion,
   listadoTareasCompletar,
};
