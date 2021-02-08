const fs = require('fs');
var colors = require('colors');

const crearArchivo = async (base = 5, hasta=10, listar = false) => {

    try {

        let salida = '';
        let consola = '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
            consola += `${base} ${'x'.green} ${i} ${'='.green} ${base * i}\n`;
        }

        if (listar) {
            console.log('=================='.green);
            console.log('   Tabla del:'.green, colors.blue(base));
            console.log('=================='.green);
            console.log(consola);
        }
        const nombreFichero = `./salida/tabla-${base}.txt`;

        fs.writeFileSync(nombreFichero, salida);

        return nombreFichero;
    } catch (err) {
        throw err;
    }

}

module.exports = {
    crearArchivo
}