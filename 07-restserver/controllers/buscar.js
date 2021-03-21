const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Categoria, Producto, Usuario } = require('../models/index');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Categoria.findById(termino);
        res.json({ resultados: (usuario) ? [usuario] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        resultados: categorias
    });

}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        res.json({ resultados: (producto) ? [producto] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');

    res.json({
        resultados: productos
    });

}


const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        res.json({ resultados: (usuario) ? [usuario] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        resultados: usuarios
    });

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            res.status(500).json({
                msg: ' Se me olvidó hacer esta búsqueda'
            })
    }

}

module.exports = {
    buscar
}