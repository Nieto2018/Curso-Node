const { response } = require('express');

const Categoria = require('../models/categoria');

const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))]);

    res.json({
        ok: true,
        total,
        categorias
    });
};

const obtenerCategoria = async (req, res = response) => {

    const id = req.params.id;

    const categoriaDB = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        ok: true,
        categoriaDB
    });

};

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar en DB
    await categoria.save();

    res.status(201).json({
        ok: true,
        categoria
    });
};

const modificarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    let categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    categoriaDB = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre');

    res.json({
        ok: true,
        msg: categoriaDB
    });
};

const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    // Lo borramos fisicamente
    // const categoria = await Categoria.findByIdAndRemove(id);

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true }).populate('usuario', 'nombre');

    res.json({
        ok: true,
        categoria
    });
};

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    modificarCategoria,
    borrarCategoria
}
