const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;
