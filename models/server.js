const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';
        
        // ConectarDB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de Aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del Body()
        this.app.use(express.json());

        // Directorio Publico
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios.routes'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        })
    }
}

module.exports = Server;