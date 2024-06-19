const { Schema, model } = require('mongoose');

const portadaSchema = Schema({
    pelicula:{
        type:Schema.Types.ObjectId,
        ref:'Pelicula'
    },
    empiza:{
        type:Date,
        required:[true,'La fecha de inicio el obligatoria']
    },
    termina:{
        type:Date,
        required:[true,'La fecha de terminacion el obligatoria']
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
});

portadaSchema.methods.toJSON = function(){
    const { __v,usuario, ...portada } = this.toObject();
    return portada;
}

module.exports = model('Portada',portadaSchema)