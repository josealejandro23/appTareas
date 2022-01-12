require("colors");

const { inquirerMenu, inquirerPause } = require("./helpers/inquirer");
// const { mostrarMenu, pausa } = require("./helpers/UlMensajes");

const main = async () => {
   console.clear();
   let opt = 0;

   do {
      opt = await inquirerMenu();
      console.log({opt});
      if(opt !== 0) await inquirerPause();
   } while (opt !== 0);
};

main();
