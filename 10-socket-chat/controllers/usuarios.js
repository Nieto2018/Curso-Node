const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))]);

    res.json({
        ok: true,
        total,
        usuarios
    });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    // El parámetro {new: true} vale para que devuelva el objeto actualizado,
    // sin dicho parámetro se envía el objeto sin los datos actualizados
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        ok: true,
        msg: usuario
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Lo borramos fisicamente
    // const usuario = await Usuario.findByIdAndRemove(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, {new: true});

    res.json({
        ok: true,
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
