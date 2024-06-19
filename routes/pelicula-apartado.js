const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');
const { validarRolUsuario } = require('../middlewares/validar-rol-usuario');
const { mostrarPeliculasPorApartados,
        mostrarPeliculasPorApartado,
        agregarPeliculaApartado,
        editarPeliculaApartado,
        eliminarPeliculaApartado } = require('../controllers/pelicula-apartado');
const { check } = require('express-validator');

const router = Router();

router.get('/',[

],mostrarPeliculasPorApartados)

.get('/:id',[
    check('id','El id del apartado no es valido').isMongoId(),
    // validar que exista el apartado
    validarCampos
],mostrarPeliculasPorApartado)

.post('/',[
    validarToken,
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('pelicula','El id de la pelicula no es valido').isMongoId(),
    //check('pelicula') validar si la pelicula existe,
    // check('apartado','El id del apartado no es valido').isMongoId(),
    //check('apartado') validar si el apartado existe,
    validarCampos
],agregarPeliculaApartado)
    
.put('/:id',[
    validarToken,   
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('pelicula','El id de la pelicula no es valido').isMongoId(),
    //check('pelicula') validar si la pelicula existe,
    // check('apartado','El id del apartado no es valido').isMongoId(),
    //check('apartado') validar si el apartado existe,
    validarCampos
],editarPeliculaApartado)

.delete('/:id',[
    validarToken,   
    validarRolUsuario([process.env.ADMINISTRADOR,process.env.USUARIO]),
    check('peliculaApartado','El id de la pelicula no es valido').isMongoId(),
    //check('peliculaApartado') validar si la pelicula existe,
    validarCampos
],eliminarPeliculaApartado)



module.exports = router;