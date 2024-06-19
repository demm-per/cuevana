const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuario,
        putUsuario,
        postUsuario,
        deleteUsuario } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCorreo, validarRol } = require('../helpers/validacion-bd');
const { validarToken } = require('../middlewares/validar-token');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');

const router = Router();

router.get('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        validarCampos
    ],getUsuario)

    .post('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR]),
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('correo','Es obligatorio ingresar un correo').isEmail(),
        check('correo','El correo es obligatorio').notEmpty(),
        check('correo').custom(existeCorreo),
        check('password','La contraseña es obligatoria').notEmpty(),
        check('rol',).custom(validarRol),
        validarCampos
    ],postUsuario)

    .put('/:id',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR]),
        check('id','El id no es valido').isMongoId(),
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').optional(),
        check('newPassword').optional(),
        validarCampos
    ],putUsuario)

    .delete('/:id',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR]),
        check('id','El id no es valido').isMongoId(),
        validarCampos
    ],deleteUsuario)

module.exports = router