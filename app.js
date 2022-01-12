require("colors");

const { inquirerMenu, inquirerPause, imprimirMensaje } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/UlMensajes");

const main = async () => {
   console.clear();
   let opt = 0;

   let tareas = new Tareas();

   do {
      opt = await inquirerMenu();

      switch (opt) {
         case 1:
            const desc = await imprimirMensaje('Descripción:');
            tareas.crearTarea(desc);
         break;
         case 2:
            console.log(tareas._listado);
         break;
      }
      
      if(opt !== 0)await inquirerPause();
   } while (opt !== 0);
};

main();
