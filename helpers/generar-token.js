const jwt = require('jsonwebtoken');

const generarJWT = async ( payload ) => {
    return new Promise(( resolve, reject )=>{
        jwt.sign( payload,process.env.PRIVATE_KEY, { expiresIn :'1hr' },( err, token ) => {
            if(err){
                console.log(err);
                reject(err);
            }
            resolve(token);
        });
    });
}

module.exports = {
    generarJWT
}