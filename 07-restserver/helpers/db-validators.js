const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con ID ${id} no existe`);
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoría con ID ${id} no existe`);
    }
}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con ID ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
