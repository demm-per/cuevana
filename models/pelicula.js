const { Schema, model, now } = require('mongoose');

const PeliculaSchema = Schema({
    titulo:{
        type:String,
        required:[true,'El titulo de la pelicula es obligatorio']
    },
    resumenBreve:{
        type:String,
        required:[true,'La sinopsis es obligatoria']
    },
    resumenExtenso:{
        type:String,
        required:[true,'La sinopsis es obligatoria']
    },
    lanzamiento:{
        type:Date,
        required:[true,'El lanzamiento es obligatorio']
    },
    actores:{
        type:Array,
        required:[true,'El nombre del director es obligatorio']
    },
    genero:[{
        type:Schema.Types.ObjectId,
        ref:'Genero',
        required:[true,'El genero es obligatorio']
    }],
    duracion:{
        type:String,
        required:[true,'La duracion es obligatoria']
    },
    calificacion:{
        type:String,
        required:[true,'La calificacion es obligatoria']
    },
    trailer:{
        type:String,
        // required:[true,'El trailer es obligatorio']
    },
    poster:{
        type:String,
        // required:[true,'El poster es obligatorio']
    },
    fondo:{
        type:String,
        // required:[true,'El poster es obligatorio']
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true,'El usuario es obligatorio para agregar la pelicula']
    },
    estado:{
        type:Boolean,
        default:true
    },
    registro:{
        type:Date,
        default: Date.now
    }

});

PeliculaSchema.methods.toJSON = function(){
    const {usuario, __v, ...pelicula} = this.toObject();
    return pelicula;
}

module.exports = model('Pelicula',PeliculaSchema);
