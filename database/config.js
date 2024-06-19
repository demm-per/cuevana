const mongoose = require('mongoose');

const connect = async ( ) => {
    try {
        await mongoose.connect(process.env.CDNMONGO);
        console.log(`Base de datos en linea`);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    connect
}