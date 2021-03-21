const { response } = require('express');
const categoria = require('../models/categoria');

const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))]);

    res.json({
        ok: true,
        total,
        productos
    });
};

const obtenerProducto = async (req, res = response) => {

    const id = req.params.id;

    const producto = await Producto.findById(id)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        producto
    });

};

const crearProducto = async (req, res = response) => {

    const { __v, usuario, estado, ...body } = req.body;

    const nombre = body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar en DB
    await producto.save();

    res.status(201).json({
        ok: true,
        producto
    });
};

const modificarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    // Faltaría controlar la categoría, que no se explicó durante el curso

    let productoDB = await Producto.findOne({ nombre: data.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    productoDB = await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        msg: productoDB
    });
};

const borrarProducto = async (req, res = response) => {
    const { id } = req.params;

    // Lo borramos fisicamente
    // const producto = await Producto.findByIdAndRemove(id);

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        producto
    });
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    borrarProducto
}
