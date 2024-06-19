const { Router } = require('express');

const router = Router();

router.get('/',(req,res)=>{
    res.status(404).json({msg:404})
})

module.exports = router;