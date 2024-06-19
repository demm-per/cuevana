const { Schema, model } = require('mongoose');

const peliculaApartadoSchema = Schema({
    pelicula:{
        type:Schema.Types.ObjectId,
        ref:'Pelicula',
        required:[true,'El id de la pelicula es obligatorio']
    },
    apartado:{
        type:Schema.Types.ObjectId,
        ref:'Apartado',
        required:[true,'El id del apartado es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports = model('PeliculaApartado',peliculaApartadoSchema);