const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const subirArchivo = async (archivo, nombreFolder, tipo) => {
    try {
        let resultado;
        switch(tipo){
            case 1:
                resultado = await cloudinary.uploader.upload(archivo, {
                    folder: nombreFolder,
                    transformation: [
                        // { height: 400, width: 200,  },
                        { height: 400 },
                        { quality: 'auto', fetch_format: 'auto' } 
                      ]
                });
                return resultado;
            case 2:
                resultado = await cloudinary.uploader.upload(archivo, {
                    folder: nombreFolder,
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' } 
                      ]
                });
                return resultado;
            case 3:
                resultado = await cloudinary.uploader.upload(archivo, {
                    resource_type: 'video' ,
                    folder: nombreFolder,
                });
                return resultado;
        }
        
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrió un error al subir el archivo, inténtalo de nuevo');
    }
};

module.exports = {
    subirArchivo
}
