const { Router } = require('express');
const { check } = require('express-validator');

const { actualizarImagen, cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivoSubir,
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;
