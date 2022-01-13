const fs = require('fs');

const path = './db/'
const fileName = 'data.json'

const writeData = (data) => {
   if(!fs.existsSync(path)){
      fs.mkdirSync(path);
   }
   fs.writeFileSync(path+fileName,JSON.stringify(data));
}

const readData = () =>{
   if(!fs.existsSync(path+fileName))
      return null;

   const info = fs.readFileSync(path+fileName,{encoding:'utf-8'});
   const data = JSON.parse(info);
   return data;
}

module.exports = {
   writeData,
   readData
}