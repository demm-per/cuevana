const { request } = require("express");

const PeliculaApartado = require('../models/pelicula-apartado');

const mostrarPeliculasPorApartados = async ( req = request, res) => {
    try {
        const peliculasApartados = await PeliculaApartado
                                            .find({estado:true})
                                            .populate('pelicula')
                                            .populate('apartado');
        res.status(200).json(peliculasApartados);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al mostrar las peliculas por apartados, comunicate con el administrador`});
    }
}

const mostrarPeliculasPorApartado = async ( req = request, res) => {
    const { id } = req.params;
    const { desde = 0, limite = 10 } = req.query;
    let peliculas;
    try {
        const apartadpPelicula = await PeliculaApartado.find({apartado:id, estado:true})
                                                .populate('pelicula')
                                                .skip(Number(desde))
                                                .limit(Number(limite));
        if(apartadpPelicula){
            peliculas = apartadpPelicula.map( pelicula =>{
                return pelicula.pelicula;
            });
        }
        res.json(peliculas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al registrar la seccion de la pelicula`
        }); 
    }
}

const agregarPeliculaApartado = async ( req = request, res) => {
    const { pelicula, apartado } = req.body;

    try {
        const apartadoPelicula = new PeliculaApartado({pelicula,apartado});
        await apartadoPelicula.save();
        res.status(201).json(apartadoPelicula);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al registrar la pelicula`
        });
    }
}

const editarPeliculaApartado = async ( req = request, res) => {
    const { id } = req.params;
    try {
        const {} = req.body();
    } catch (error) {
        
    }
}

const eliminarPeliculaApartado = async ( req = request, res) => {
    const { id } = req.params;
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    mostrarPeliculasPorApartados,
    mostrarPeliculasPorApartado,
    agregarPeliculaApartado,
    editarPeliculaApartado,
    eliminarPeliculaApartado,
}
