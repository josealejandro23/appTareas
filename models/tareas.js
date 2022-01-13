const Tarea = require("./tarea");

/**
 * {
 *    uuid-asd-2w32:{
 *       creadoEn: dsfasdf
 *       descripcion:werfsds
 *    },
 *    uuid-klsdjf-234:{
 *       creadaEn:Asdf,
 *       descripcion:sdjfo
 *    }
 * }
 */

class Tareas {
   _listado = {};

   get listaTareas() {
      const listadoTareas = [];
      Object.keys(this._listado).forEach((key) => {
         const Tarea = this._listado[key];
         listadoTareas.push(Tarea);
      });

      return listadoTareas;
   }

   constructor() {
      this._listado = {};
   }

   crearTarea(desc = "") {
      const tarea = new Tarea(desc);
      this._listado[tarea.id] = tarea;
   }

   cargarTareas(listaTareas = []) {
      try {
         listaTareas.forEach((obj) => {
            this._listado[obj.id] = obj;
         });
      } catch (e) {
         console.error("No fue posible cargar las tareas previas");
      }
   }

   mostrarTareas() {
      try {
         console.log("\n");
         this.listaTareas.forEach((tarea, idx) => {
            const i = `${idx + 1}.`.green;
            const { descripcion, creadaEn, finalizadaEn } = tarea;
            const estado = finalizadaEn ? `Terminada el ${finalizadaEn}`.green : "Pendiente".red;
            console.log(`${i} ${descripcion}. Creada el: ${creadaEn} :: Estado actual:  ${estado}`);
         });
      } catch (e) {
         return "Error al imprimir las tareas: ";
      }
   }

   listarTareasPorEstado(bCompletada = true) {
      try {
         console.log("\n");
         let i = 0;
         this.listaTareas.forEach((tarea) => {
            const { descripcion, creadaEn, finalizadaEn } = tarea;
            const estado = finalizadaEn ? `Terminada el ${finalizadaEn}`.green : "Pendiente".red;

            if (bCompletada) {
               if (finalizadaEn) {
                  i++;
                  console.log(`${(i + ".").green} ${descripcion}. Creada: ${creadaEn} :: ${estado}`);
               }
            } else {
               if (!finalizadaEn) {
                  i++;
                  console.log(`${(i + ".").green} ${descripcion}. Creada: ${creadaEn} :: ${estado}`);
               }
            }
         });
      } catch (error) {
         return "Error al imprimir las tareas: ";
      }
   }

   borrarTarea( id = ''){
      if(this._listado[id]){
         delete this._listado[id];
      }
   }

   cambiarEstadoTareas( ids = []){
      //-- se recorre el listado de ids y se ubica cada tarea en el listado de tareas, si no tienen fecha de finalización se pone la hora actual
      ids.forEach(id =>{
         const Tarea = this._listado[id];
         if(!Tarea.finalizadaEn){
            Tarea.finalizadaEn = new Date().toLocaleString();
         }
      });
      //-- se recorre el listado de tareas y se extrae cada id, si el listado de ids recibidos no contiene el id de la tarea actual entonces 
      //--su fecha de finalización se pone en null
      this.listaTareas.forEach(tarea =>{
         if(!ids.includes(tarea.id)){
            this._listado[tarea.id].finalizadaEn = null
         }
      })
   }
}

module.exports = Tareas;
