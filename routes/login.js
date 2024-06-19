const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/login');

const router = Router();

router.post('/',[
    check('correo','El correo es obligatorio').notEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validarCampos
],login);

module.exports = router