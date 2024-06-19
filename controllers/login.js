const { validarPassword } = require('../helpers/utilidades-autenticacion');
const { generarJWT } = require('../helpers/generar-token');
const Usuario = require('../models/usuario');

const login = async ( req, res) => {
    const { correo, password } = req.body;

    const correoExpReg = new RegExp(correo);

    const usuario = await Usuario.findOne({ correo:correoExpReg });

    // existe usario
    if(!usuario){
        return res.status(401).json({
            msg:`Contraseña o Correo Son Incorrectos -no existe`
        });
    }
    
    // usuario ACTIVO
    if(!usuario.estado){
        return res.status(401).json({
            msg:`Contraseña o Correo Son Incorrectos -eliminado`
        });
    }

    // VALIDAR contraseña
    const esPasswordValido = await validarPassword(password,usuario.password);
    
    if( !esPasswordValido ){
        return res.status(401).json({
            msg:`Contraseña o Correo Son Incorrectos - contraseña`
        });
    }
    
    //GENERAR token 
    const token = await generarJWT({uid:usuario.id});

    res.status(200).json({
        token,
        usuario
    });
}

module.exports = {
    login
}