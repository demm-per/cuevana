const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { mostrarSecciones,
        mostrarSeccionPorId,
        agregarSeccion,
        actualizarSeccion,
        eliminarSeccion } = require('../controllers/seccion');
const { validarToken } = require('../middlewares/validar-token');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');

const router = Router();

router.get('/',[
    
],mostrarSecciones);

router.get('/:id',[
    check('id','El id no es valido').isMongoId(),
    // validar si la seccion existe
    validarCampos
],mostrarSeccionPorId)

.post('/',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    // check('id','El id no es valido').isMongoId(),
    // validar Si no esta registrada la seccion
    validarCampos
],agregarSeccion)

.put('/:id',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('id','El id no es valido').isMongoId(),
    // validar si la seccion existe
    check('nombre','El nombre de la seccion es obligatorio'),
    // validar que el nombre que se va a actualizar no esta registrado
    validarCampos
],actualizarSeccion)

.delete('/:id',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('id','El id no es valido').isMongoId(),
    // validar si la seccion existe
    validarCampos
],eliminarSeccion)


module.exports = router;