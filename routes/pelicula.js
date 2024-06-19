const { Router } = require('express');
const { check } = require('express-validator');
const { validarToken } = require('../middlewares/validar-token');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { agregarPelicula, editarPelicula, eliminarPelicula, mostrarPeliculas, mostrarPeliculaPorId, mostrarPeliculaPorGenero, mostrarPeliculasRecientes } = require('../controllers/pelicula');

const router = Router();

router.get('/',mostrarPeliculas)

    .get('/:id',[
        check('id','El id no es valido').isMongoId(),
        validarCampos
    ],mostrarPeliculaPorId)

    .post('/genero',[
        // check('id','El id no es valido').isMongoId(),
        // validarCampos
    ],mostrarPeliculaPorGenero)

    .get('/recien/agregadas',[
        // check('id','El id no es valido').isMongoId(),
        // validarCampos
    ],mostrarPeliculasRecientes)

    .post('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('titulo','El titulo es requerido').notEmpty().isString(),
        check('resumenBreve','La sinopsis es obligatorida').notEmpty().isString(),
        check('resumenExtenso','La sinopsis es obligatorida').notEmpty().isString(),
        check('lanzamiento','El lanzamiento es requerido').notEmpty().isString(),
        check('actores','Los actores son requeridos').notEmpty().isArray(),
        check('genero','El genero es requerido').notEmpty().isArray(),
        check('duracion','El duracion es requerida').notEmpty().isString(),
        check('calificacion','El calificacion es requerida').notEmpty().isString(),
        // check('trailer','El trailer es requerido').notEmpty().isString(),
        // check('poster','El poster es requerido').notEmpty(),
        // check('fondo','El trailer es requerido').notEmpty(),
        validarCampos
    ],agregarPelicula)

    .put('/:id',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('id','El id no es valido').isMongoId(),
        validarCampos
    ],editarPelicula)
    
    .delete('/',[
        validarToken,
        validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
        check('id','El id no es valido').isMongoId(),
        validarCampos
    ],eliminarPelicula)


module.exports = router;