const Tarea = require('./tarea');

/**
 * {
 *    uuid-asd-2w32:{
 *       creadoEn: dsfasdf
 *       descripcion:werfsds
 *    }
 * }
 */

class Tareas  {
   _listado = {}

   constructor(){
      this._listado = {}
   }

   crearTarea = (desc = '') => {
      const tarea = new Tarea(desc);
      this._listado[tarea.id] = tarea;
   }
}

module.exports = Tareas;