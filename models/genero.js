const { Schema,model } = require('mongoose');

const generoSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre de la categoria es obligatorio']
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true,'El usuario es obligatorio para agregar una categoria']
    },
    estado:{
        type:String,
        default:true
    }

});

generoSchema.methods.toJSON = function (){
    const {__v, usuario, estado, ...categoria} = this.toObject();
    return categoria
}

module.exports = model('Genero',generoSchema);