const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { connect } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            apartado:'/api/apartado',
            genero:'/api/genero',
            login:'/api/auth/login',
            pelicula:'/api/pelicula',
            portada:'/api/portada',
            peliculaApartado:'/api/pelicula-apartado',
            seccion:'/api/seccion',
            usuario:'/api/usuario',
            notFound:'*'
        };
        
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    middlewares(){
        this.app.use(cors());
        
        this.app.use(express.static('./public'));
        this.app.use(express.json());
        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            // Crea el fichero si es que no existe
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.path.apartado,require('../routes/apartado'));
        this.app.use(this.path.genero, require('../routes/genero'));
        this.app.use(this.path.login, require('../routes/login'));
        this.app.use(this.path.pelicula, require('../routes/pelicula'));
        this.app.use(this.path.portada, require('../routes/portada'));
        this.app.use(this.path.seccion, require('../routes/seccion'));
        this.app.use(this.path.peliculaApartado, require('../routes/pelicula-apartado'));
        this.app.use(this.path.usuario, require('../routes/usuario'));
        this.app.use(this.path.notFound,require('../routes/not-found'));
    }

    async connectDB(){
        await connect();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        })
    }
    
}

module.exports = Server;