const { Schema, model } = require('mongoose');

const seccionSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre de la seccion es obligatorio']
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true,'El usuario es obligatorio']
    },
    apartado:[{
        type:Schema.Types.ObjectId,
        ref:'Apartado'
    }],
    estado:{
        type:Boolean,
        default:true
    }
});

seccionSchema.methods.toJSON = function(){
    const { __v, estado, usuario, ...seccion } = this.toObject();
    return seccion;
}

module.exports = model('Seccion',seccionSchema);