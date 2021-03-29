const validarArchivo = require('./validar-archivo');
const validaCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');

module.exports = {
    ...validarArchivo,
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}