const http = require('http');

http.createServer((req, res) => {

    // Indica que la respuesta lleva un archivo adjunto con un nombre específico para descargar
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv ');
    // res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('Hola mundo');
    res.end();
    
}).listen(8080);

console.log('Escuchando el puerto', 8080)