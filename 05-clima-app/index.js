require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                if (id === '0') continue;


                //seleccionar el lugar
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

                // Guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                //Clicma

                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:'.cyan, clima.temp);
                console.log('Mínima:', clima.temp_min);
                console.log('Máxima:', clima.temp_max);
                console.log('Como está el clima:', clima.desc.green);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`)
                });
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();