const Pelicula = require('../models/pelicula');
const Genero = require('../models/genero');
const { subirArchivo } = require('../helpers/utilidades-cloudinary');


const mostrarPeliculas = async ( req, res ) => {
    // const pelicula = await Pelicula.find({estado:true});
    try {
        
        let peliculas = await Pelicula.find().populate('genero','nombre');
        
        res.json(
            peliculas
        )
    } catch (error) {
        console.log(error);
    }
    
}

const mostrarPeliculaPorId = async ( req, res ) => {
    try {
        const {id} = req.params;
        let pelicula = await Pelicula.findById(id).populate('genero','nombre');
        
        res.json(
            pelicula
        )
    } catch (error) {
        console.log(error);
    }
    
}

const mostrarPeliculaPorGenero = async ( req = request, res = response ) => {
    const { generos } = req.body;
    const { desde = 0, limite = 10 } = req.query;
    try {
        const peliculas = await Pelicula.find({
            genero:{
                $in:generos
            }
        }).distinct('_id');
        
        const peliculasUnicas = await Pelicula.find({
            _id: { 
                $in: peliculas 
            }
        }).skip(Number(desde)).limit(Number(limite)).populate('genero', 'nombre');

        res.json(
            peliculasUnicas
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al mostrar las peliculas, cominicate con el administrador`
        })
    }
}

const mostrarPeliculasRecientes = async ( req = request, res = response ) => {
    const { desde = 0 , limite = 30 } = req.query;
    try {
        const peliculas = await Pelicula.find().sort({ registro: -1 }).skip(Number(desde)).limit(Number(limite)).exec();
        
        res.json(
            peliculas
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al mostrar las peliculas, cominicate con el administrador`
        })
    }
}



const agregarPelicula = async ( req, res ) => {
    try {
        
        const tempFilePathPoster = req.files?.poster.tempFilePath;
        const tempFilePathFondo = req.files?.fondo.tempFilePath;
        const tempFilePathVideo = req.files?.trailer.tempFilePath; 

        let data = req.body;

        data.usuario = req.usuario;
        data.lanzamiento = new Date(req.body.lanzamiento);

        const [poster, fondo, trailer] = await Promise.all([
            subirArchivo(tempFilePathPoster, 'Poster peliculas',1),
            subirArchivo(tempFilePathFondo, 'fondo peliculas',2),
            subirArchivo(tempFilePathVideo, 'Trailer peliculas',3),
        ]);
        
        data.poster = poster.secure_url;
        data.fondo = fondo.secure_url;
        data.trailer = trailer.secure_url;


        const pelicula = new Pelicula(data); // No es necesario utilizar {data} si data ya es un objeto

        await pelicula.save();

        res.json(
            data
        );
    } catch (error) {
        // Manejar el error de manera adecuada
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al agregar la película' });
    }
}

const editarPelicula = async ( req, res ) => {
    try {
        let data = req.body;
        const {id} = req.params;


        // const {tempFilePath:tempFilePathPoster} = req.files?.poster;
        // const {tempFilePath:tempFilePathFondo} = req.files?.fondo;
        const {tempFilePath:tempFilePathTrailer} = req.files?.trailer;

        // const [poster, fondo] = await Promise.all([
            // subirArchivo(tempFilePathPoster, 'Poster peliculas',1),
            // subirArchivo(tempFilePathFondo, 'fondo peliculas',2),            
        // ]);   

        const trailer = await subirArchivo(tempFilePathTrailer, 'trailers',3);  

        // console.log(poster);
        // console.log(fondo);
    
        // data.poster = poster.secure_url;
        // data.fondo = fondo.secure_url;
        data.trailer = trailer.secure_url;


        const pelicula = await Pelicula.findByIdAndUpdate(id,data,{new:true}); 

        res.json({
            pelicula
        });
    } catch (error) {
        // Manejar el error de manera adecuada
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al agregar la película' });
    }
}

const eliminarPelicula = async ( req, res ) => {
    try {
        const {id} = req.params;
        const pelicula = await Pelicula.findByIdAndUpdate(id,{estado:false},{new:true}); 
        res.json({pelicula})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al eliminar la película' });
    }
}

module.exports = {
    mostrarPeliculas,
    mostrarPeliculaPorId,
    mostrarPeliculaPorGenero,
    mostrarPeliculasRecientes,
    agregarPelicula,
    editarPelicula,
    eliminarPelicula
}
