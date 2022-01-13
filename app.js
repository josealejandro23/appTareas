require("colors");

const { inquirerMenu, inquirerPause, imprimirMensaje } = require("./helpers/inquirer");
const { writeData, readData } = require("./helpers/ulFiles");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/UlMensajes");

const main = async () => {
   console.clear();
   let opt = 0;

   let tareas = new Tareas();
   const tareasDB = readData();

   //*se cargan las tareas desde la base de datos de la app
   if(tareasDB)
      tareas.cargarTareas(tareasDB);
   
   do {
      //se imprime el menú
      opt = await inquirerMenu();

      switch (opt) { 
         //crear tarea
         case 1:
            const desc = await imprimirMensaje('Descripción:');
            tareas.crearTarea(desc);
         break;
         case 2:
            tareas.listarTareas();
         break;
      }

      writeData(tareas.listaTareas);
      
      if(opt !== 0)await inquirerPause();
   } while (opt !== 0);
};

main();
