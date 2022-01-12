const {v4:uuidv4} = require('uuid');

class Tarea {
   id = "";
   descripcion = "";
   creadaEn = null;
   finalizadaEn = null;

   constructor(descripcion) {
      this.id = uuidv4();
      this.descripcion = descripcion;
      this.creadaEn = new Date().toLocaleString();
      this.finalizadaEn = null;
   }
}

module.exports = Tarea;