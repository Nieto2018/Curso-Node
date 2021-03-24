const validarArchivo = require('../middlewares/validar-archivo');
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarArchivo,
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}