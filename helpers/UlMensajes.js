import('colors');

const mostrarMenu = ()=>{
   console.clear();
   console.log('=================================='.yellow);
   console.log("       Seleccione una opción       ".green);
   console.log("==================================\n".yellow);
   
   console.log(`${'1'.green}. Crear tarea`);
   console.log(`${'2'.green}. Ver tareas`);
   console.log(`${'3'.green}. Ver tareas completadas`);
   console.log(`${'4'.green}. Ver tareas pendientes`);
   console.log(`${'5'.green}. Completar tarea(s)`);
   console.log(`${'6'.green}. Borrar tarea`);
   console.log(`${'0'.green}. Salir\n`);

   //-- Captura de la información entregada por consola
   const readLine = require('readline').createInterface({
      input:process.stdin,
      output:process.stdout
   });

   readLine.question('Seleccione una opción: ',(res)=>{
      console.log( { res } );
      readLine.close();
   })
}

module.exports = {
   mostrarMenu
}