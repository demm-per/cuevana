const validarRolUsuario = (getRolesPermitidos) => {
    return (req, res, next) => {
        const rolesPermitidos = getRolesPermitidos;

        const { rol } = req.usuario;

        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({ msg: 'No tienes los permisos requeridos' });
        }

        next();
    };
};

module.exports = {validarRolUsuario};
