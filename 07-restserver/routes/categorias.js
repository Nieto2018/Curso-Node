const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { existeCategoriaPorId } = require('../helpers/db-validators');// importa el archivo index.js que se encuentre en la ruta

const {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    modificarCategoria,
    borrarCategoria
} = require('../controllers/categorias');

const router = Router();

// Obtener todas las categorias (público)
router.get('/', obtenerCategorias);

// Obtener una categoria (público)
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear una categoria (privado con token válido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria (privado con token válido)
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], modificarCategoria);

// Borrar una categoria (privado - Admin)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;
