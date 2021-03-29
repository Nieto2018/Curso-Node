const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    categoria: {
        type: Schema.Types.ObjectID,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        default: 0
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectID,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {
        type: String
    }
});

ProductoSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', ProductoSchema);