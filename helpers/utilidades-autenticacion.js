const bcrypt = require('bcryptjs');

const encriptarPassword = async ( password = '' ) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

const validarPassword = async ( password = '', hashPasword ) => {
    return bcrypt.compareSync(password,hashPasword)
}

module.exports = {
    encriptarPassword,
    validarPassword
}