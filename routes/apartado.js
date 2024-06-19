const { Router } = require('express');

const { mostrarApartados,
        mostrarApartadoPorId,
        agregarApartado,
        actualizarApartado,
        eliminarApartado } = require('../controllers/apartado');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');
const { check } = require('express-validator');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');

const router = Router();

router.get('/',[],mostrarApartados)

.get('/:id',[
    check('id','El id no es valido').isMongoId(),
    // validar que exista el id en la bd
    validarCampos
],mostrarApartadoPorId)

.post('/',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('nombre','El nombre del apartado es obligatorio').notEmpty(),
    // validar si el nombre del apartado no existe en la bd
    validarCampos
],agregarApartado)

.put('/:id',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('nombre','El nombre del apartado es obligatorio').notEmpty(),
    // validar si el nombre del apartado no existe en la bd
    validarCampos
],actualizarApartado)

.delete('/:id',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('id').isMongoId(),
    // validar que el id exista en la bd
    validarCampos
],eliminarApartado)

module.exports = router;