const Seccion = require('../models/seccion');

const mostrarSecciones = async( req, res ) => {
    try {
        const secciones = await Seccion.find({estado:true}).populate('apartado',["_id","nombre"]);
        res.status(200).json(secciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Ocurrio un problema al mostrar las secciones, comunicate con el administrador'});
    }
}

const mostrarSeccionPorId = async( req, res ) => {
    const { id } = req.params;
    try {
        const seccion = await Seccion.findById(id).populate('apartado',["_id","nombre"]);
        res.status(200).json(seccion);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al mostrar la seccion con id: ${id}, comunicate con el administrador`});
    }
}

const agregarSeccion = async( req, res ) => {
    const { nombre, apartado } = req.body;
    const { _id } = req.usuario;
    try {
        const seccion = new Seccion({ nombre, apartado, usuario:_id });
        await seccion.save();
        res.status(201).json(seccion);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Ocurrio un problema al registrar la seccion con nombre: ${nombre}, comunicate con el administrador`});
    }
}

const actualizarSeccion = async( req, res ) => {
    const { id } = req.params;
    const { estado, usuario, __v, ...data } = req.body;
    try {
        const seccion = await Seccion.findByIdAndUpdate(id,data,{new:true});
        res.status(200).json(seccion);
    } catch (error) {
        res.status(500).json({msg:`Ocurrio un problema al editar la seccion con id: ${id}, comunicate con el administrador`});
    }
}

const eliminarSeccion = async( req, res ) => {
    try {
        const { id } = req.params;
        const seccion = await Seccion.findByIdAndUpdate(id,{estado:false},{new:true});
        res.status(200).json({msg:`Seccion: ${seccion.nombre} Eliminada`});
    } catch (error) {
        res.status(500).json({msg:`Ocurrio un problema al eliminar la seccion con id: ${id}, comunicate con el administrador`});
    }
}


module.exports = {
    mostrarSecciones,
    mostrarSeccionPorId,
    agregarSeccion,
    actualizarSeccion,
    eliminarSeccion
}