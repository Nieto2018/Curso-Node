const path = require('path');
const fs = require('fs');
const { response } = require('express');

var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

const { subirArchivo } = require('../helpers');


const { Producto, Usuario } = require('../models');

const cargarArchivo = async (req, res = response) => {

    try {
        // Se envia undefined para que la variable, que es obligatoria por posición, tome el valor por defecto
        // Imágenes
        const nombre = await subirArchivo(req.files, undefined, 'images');
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el ID ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    modelo.save();

    res.json(modelo);
}

const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el ID ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el ID ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
}

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivo,
    mostrarImagen
}