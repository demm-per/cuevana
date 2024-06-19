const { response, request } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { encriptarPassword } = require("../helpers/utilidades-autenticacion");

const getUsuario = async ( req, res = response ) => {
    const { desde = 0, limite = 5 } = req.query;
    const [ usuario, total ] = await Promise.all([
        Usuario.find({estado:true}).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments()
    ]);
                                
    res.json({
        total,
        usuario
    })
}

const postUsuario = async ( req = request, res = response ) => {
    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({nombre,correo,rol});

    usuario.password = await encriptarPassword(password);

    await usuario.save();

    res.status(200).json(
        usuario
    );
}

const putUsuario = async ( req, res = response ) => {
    const { _id, correo, password , newPassword = '', ...data } = req.body;
    const {id} = req.params;

    if( newPassword.length > 0 ){
        data.password = await encriptarPassword(password);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json({
        usuario
    });
}

const deleteUsuario = async ( req, res = response ) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado:false }, { new:true });
    res.status(200).json({usuario});
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}