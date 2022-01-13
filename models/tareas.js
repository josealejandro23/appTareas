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

   listarTareas() {
      try {
         console.log('\n');
         this.listaTareas.forEach((tarea,idx) =>{
            const i = `${idx + 1}.`.green;
            const {descripcion,creadaEn,finalizadaEn} = tarea;
            const estado = finalizadaEn ?    
                              `Terminada el ${finalizadaEn}`.green:
                              'Pendiente'.red; 
            console.log(`${i} ${descripcion}. Creada el: ${creadaEn} :: Estado actual:  ${estado}`);
         });
      } catch (e) {
         return "Error al imprimir las tareas: ";
      }
   }
}

module.exports = Tareas;
