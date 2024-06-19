const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarCategorias,
        agregarCategoria,
        editarCategoria,
        eliminarCategoria, 
        mostrarCategoriaPorId} = require('../controllers/categoria');

const { validarToken } = require('../middlewares/validar-token');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');
const { validarCampos } = require('../middlewares/validar-campos');
        
const router = Router();

    router.get('/',[

    ],mostrarCategorias)

    .get('/:id',[
        check('id')
    ],mostrarCategoriaPorId)

    .post('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('nombre','El nombre de la categoria es obligatorio').notEmpty(),
        validarCampos
    ],agregarCategoria)

    .put('/:id',[
        check('id')
    ],editarCategoria)

    .delete('/:id',[
        check('id')
    ],eliminarCategoria)


module.exports = router;