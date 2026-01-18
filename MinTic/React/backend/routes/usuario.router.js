const express = require("express");
const router = express.Router();
const usuariosController = require("../Controllers/usuarios.controller");

router.post("/login", usuariosController.login)

module.exports = router