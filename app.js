require("colors");

const {
   inquirerMenu,
   inquirerPause,
   imprimirMensaje,
   listadoTareasBorrar,
   confirmarAccion,
   listadoTareasCompletar,
} = require("./helpers/inquirer");
const { writeData, readData } = require("./helpers/ulFiles");
const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/UlMensajes");

const main = async () => {
   console.clear();
   let opt = 0;
   let tareas = new Tareas();
   const tareasDB = readData();

   //*se cargan las tareas desde la base de datos de la app
   if (tareasDB) tareas.cargarTareas(tareasDB);

   do {
      //se imprime el menú
      opt = await inquirerMenu();

      switch (opt) {
         case 1: //crear tarea
            const desc = await imprimirMensaje("Descripción:");
            tareas.crearTarea(desc);
            break;
         case 2:  //ver todas las tareas
            tareas.mostrarTareas();
            break;
         case 3:  //Ver tareas compleatas
            tareas.listarTareasPorEstado(true);
            break;
         case 4: //ver tareas pendientes
            tareas.listarTareasPorEstado(false);
            break;
         case 5:  //completar tareas
            const ids = await listadoTareasCompletar(tareas.listaTareas);
            tareas.cambiarEstadoTareas(ids);
            break;
         case 6:  //borrar tareas
            //--se imprime la lista de tareas
            const id = await listadoTareasBorrar(tareas.listaTareas);
            //--si no se eligio cancelar se continúa con el borrado
            if (id !== "0") {
               //--se valida si en verdad se va a borrar la tarea elegida
               const bConfirmar = await confirmarAccion("¿Está seguro de borrar la tarea?");
               if (bConfirmar) {
                  //--se borra la tarea
                  tareas.borrarTarea(id);
                  console.log("Tarea borrada");
               }
            }
            break;
      }
      //--se almacena la información en la base de datos
      writeData(tareas.listaTareas);
      //--mientras no se elija la opción de salir se repite el menú, se llama la pausa para ver el resultado de cada operación
      if (opt !== 0) await inquirerPause();
   } while (opt !== 0);
};

main();
