const Usuario = require('../models/usuario');
const Rol = require('../models/role');
const Genero = require('../models/genero');

const existeCorreo = async ( correo = '' ) => {
    correoExpReg = new RegExp(correo,'i') ;
    const usuario = await Usuario.findOne({ correo : correoExpReg });

    if( usuario ){
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }

    return true;
}

const validarRol = async ( rol='' ) => {
    if( rol.length == 0 ){
        throw new Error(`El rol: ${rol}, El rol es obligatorio`);
    }
    const role = await Rol.findOne({rol});
    if(!role){
        throw new Error(`El rol: ${rol}, no es valido`);
    }
    return true;
}


const existeGeneroPorNombre = async ( nombre = '' ) => {
    try {

        const genero = await Genero.findOne({nombre: new RegExp(nombre,'i')});
        if( genero ){
            throw new Error(`El genero: ${nombre} ya esta registrado`);
        }
        return true
    } catch (error) {
            throw new Error(`Ocurrio un problema al validar el genero:${nombre}, itente de nuevo`);        
    }
}

const existeGeneroPorId = async ( id = '' ) => {
    try {

        const genero = await Genero.findById(id);
        if( !genero ){
            throw new Error(`El genero con id: ${id} no existe`);
        }
        return true
    } catch (error) {
            throw new Error(`Ocurrio un problema al validar el genero:${id}, itente de nuevo`);        
    }
}

module.exports = {
    existeCorreo,
    validarRol,
    existeGeneroPorNombre,
    existeGeneroPorId
}