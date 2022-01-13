const Tarea = require('./tarea');

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

   crearTarea = (desc = "") => {
      const tarea = new Tarea(desc);
      this._listado[tarea.id] = tarea;
   };

   fijarTareas(listaTareas = []) {
      try {
         listaTareas.forEach((obj) => {
         this._listado[obj.id] = obj;
         });
      } catch (e) {
         console.error("No fue posible cargar las tareas previas");
      }
   }
}

module.exports = Tareas;