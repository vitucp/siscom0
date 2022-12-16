const multer = require('multer');
const path = require('path');

function storage(req, res, next){

   storage = multer.diskStorage({
    destination: (req, file, callback ) => {
        callback(null, path.resolve('uploads/'));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();

        callback(null, `${time}_${file.originalname}`);
    }
}).catch((erro) => {
    console.log('ERRO uploads: ', erro)
})

}




module.exports = storage
