const Apartado = require('../models/apartado');

const mostrarApartados = async ( req, res ) => {
    try {
        const apartados = await Apartado.find({estado:true});
        res.status(200).json(apartados);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al mostrar los apartados`});
    }
}

const mostrarApartadoPorId = async ( req, res ) => {
    const { id } = req.params;
    try {
        const apartado = await Apartado.find({estado:true});
        res.status(200).json(apartado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al mostrar el apartado con id: ${id}`});
    }
}

const agregarApartado = async ( req, res ) => {
    const { nombre } = req.body;
    const { _id } = req.usuario;
    
    try {
        const aparatado = new Apartado({nombre,usuario:_id});
        await aparatado.save();
        res.status(201).json(aparatado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al registrar el apartado: ${nombre}, comuniquese con el administrador`});
    }
}

const actualizarApartado = async ( res, req ) => {
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        const apartado = await Apartado.findByIdAndUpdate(id,{nombre},{new:true});
        res.status(200).json(apartado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al actualizar el apartado: ${id}, comuniquese con el administrador`});
    }    
}

const eliminarApartado = async ( res, req ) => {
    const { id } = req.params;
    try {
        const apartado = await Apartado.findByIdAndUpdate(id,{estado:false},{new:true});
        res.status(200).json(apartado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al eliminar el apartado: ${id}, comuniquese con el administrador`});
    }    
}

module.exports = {
    mostrarApartados,
    mostrarApartadoPorId,
    agregarApartado,
    actualizarApartado,
    eliminarApartado
}