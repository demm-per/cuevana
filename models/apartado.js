const { Schema, model } = require('mongoose');

const apartadoSchema = Schema({
    nombre:{
        type:String,
        required:[true, "El nombre del apartado es obligatorio"]
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        // required:[true,'El usuario es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true
    }
});

apartadoSchema.methods.toJSON = function () {
    const { usuario, ...data } = this.toObject();
    return data;
}

module.exports = model('Apartado',apartadoSchema);