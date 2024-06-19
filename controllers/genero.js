const { request, response } = require("express");

const Genero = require('../models/genero');

const getGenero = async ( req = request, res = response ) => {
    //  Promise.all([
        // Categoria.countDocuments({estado:true}),
    // ]);
    const generos = await Genero.find({estado:true})
        
    res.json(
        generos
    );
}

const obtenerGeneroPorId = async ( req = request, res = response ) => {
    const {id} =req.params;
    
    const genero = await Genero.findById(id)
    
    res.json(
        genero
    );
}
    
const postGenero = async ( req = request, res = response ) => {
    const { nombre } = req.body;
    const {_id:usuario} = req.usuario;
    
    const genero = new Genero({nombre,usuario});

    await genero.save();

    res.json({genero});
}
    
const putGenero = async ( req = request, res = response ) => {
    const { id } = req.params;
    
    const { nombre } = req.body;
    
    const genero = await Genero.findByIdAndUpdate(id,{nombre},{new:true});

    res.json({genero});
}
    
const deleteGenero = async ( req = request, res = response ) => {
    const { id } = req.params;
    
    const genero = await Genero.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({genero});
}


module.exports = {
   getGenero,
   obtenerGeneroPorId,
   postGenero,
   putGenero,
   deleteGenero
}