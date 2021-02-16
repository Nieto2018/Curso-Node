const Tarea = require('./tarea');
const Colors = require('colors');

/** 
 * _listado:
 *  {   'uuid-12345-12345': {id: 1, desc:asd, completadoEn:10-1-2021 } }
*/
class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        Object.values(this._listado).forEach((tarea, counter) => {
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${Colors.green((counter + 1) + '.')} ${tarea.desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        Object.values(this._listado)
            .filter(tarea => tarea.completadoEn !== null === completadas)
            .forEach((tarea, counter) => {
                const estado = tarea.completadoEn ? `${tarea.completadoEn}`.green : 'Pendiente'.red;
                console.log(`${Colors.green((counter + 1) + '.')} ${tarea.desc} :: ${estado}`);
            });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;