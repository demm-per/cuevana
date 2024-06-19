const { Router } = require('express');
const { check } = require('express-validator');
const { getGenero, obtenerGeneroPorId, deleteGenero, putGenero, postGenero } = require('../controllers/genero');
const { validarToken } = require('../middlewares/validar-token');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');
const { existeGeneroPorNombre, existeGeneroPorId } = require('../helpers/validacion-bd');

const router = Router();

    router.get('/',[
    
    ],getGenero)

    router.get('/:id',[
        
    ],obtenerGeneroPorId)
    
    .post('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('nombre','El nombre de la genero es obligatorio').notEmpty(),
        check('nombre').custom(existeGeneroPorNombre),
        validarCampos
    ],postGenero)

    .put('/:id',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('id','El id no es valido').isMongoId(),
        check('nombre','El nombre del genero es obligatorio').notEmpty(),
        
        validarCampos
    ],putGenero)

    .delete('/:id',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('id','El id no es valido').isMongoId(),
        check('id').custom(existeGeneroPorId),
        validarCampos
    ],deleteGenero)

module.exports = router;