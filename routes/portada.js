const { Router } = require('express');
const { mostrarPortadas, mostrarPortada, agregarPortada, editarPortada, eliminarPortada } = require('../controllers/portada');

const router = Router();

router.get('/',[
        
    ],mostrarPortadas)
    
    .get('/:id',[
                
    ],mostrarPortada)
    
    .post('/',[            
    
    ],agregarPortada)
    
    .put('/',[
                
    ],editarPortada)
    
    .delete('/',[          
    
    ],eliminarPortada)


module.exports = router;