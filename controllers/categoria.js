const Categoria = require('../models/categoria');

const mostrarCategorias = async (req,res) => {

}

const mostrarCategoriaPorId = async (req,res) => {

}

const agregarCategoria = async (req,res) => {
    const { nombre } = req.body;
    try {

        const categoria = new Categoria({nombre});
        categoria.usuario = req.usuario._id;
        await categoria.save();
        res.status(201).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al agregar la categoria: ${nombre}, comunicate con el administrador`
        })
    }
}

const editarCategoria = async (req,res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByIdAndUpdate(id,{nombre},{new:true});

        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al editar la categoria: ${id}, comunicate con el administrador`
        })
    }
}

const eliminarCategoria = async (req,res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrio un problema al tratar de eliminar la categoria: ${id}, comunicate con el administrador`
        })
    }
}

module.exports = {
    mostrarCategorias,
    mostrarCategoriaPorId,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria
}