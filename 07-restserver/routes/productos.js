const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');// importa el archivo index.js que se encuentre en la ruta

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    borrarProducto
} = require('../controllers/productos');

const router = Router();

// Obtener todas las productos (público)
router.get('/', obtenerProductos);

// Obtener una producto (público)
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear una producto (privado con token válido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar una producto (privado con token válido)
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], modificarProducto);

// Borrar una producto (privado - Admin)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;
