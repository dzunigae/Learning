const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { usuario, pass } = req.body;
        // 1. Buscar usuario
        const user = await Usuario.findOne({ usuario });
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        };
        // 2. Comparar contraseña
        const isValid = await bcrypt.compare(pass, user.pass);
        if (!isValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        console.log("JWT_SECRET =", process.env.JWT_SECRET);
        // 3. Generar token
        const token = jwt.sign(
            {
                id: user._id,
                usuario: user.usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        // 4. Responder
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
