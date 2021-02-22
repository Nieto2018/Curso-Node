const { response } = require('express');

const usuariosGet = (req, res = response) => {
    const { q, k = "3", page = "1", limit } = req.query;

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        k,
        page,
        limit
    });
};

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'post API - Controlador',
        nombre,
        edad
    });
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put API - Controlador',
        id
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
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