const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = async (req, res, next ) => {
    const token = req.header('x-token');

    if(!token){
        return res.json({msg:'Token invalido -no hay token'})
    }

    try {

    const {uid} = jwt.verify(token,process.env.PRIVATE_KEY);

    const usuario = await Usuario.findById(uid);

    if(!usuario){
        return res.json({msg:`token invalido -usuario no existe`});
    }
    
    if(!usuario.estado){
        return res.json({msg:`token invalido -usuario eliminado`});
    }

    req.usuario = usuario;
    // console.log(usuario);

    next();
        
    } catch (error) {
        console.log(error);
        res.json({msg:`token invalido :(`})
        
    }
}

module.exports = {
    validarToken
}