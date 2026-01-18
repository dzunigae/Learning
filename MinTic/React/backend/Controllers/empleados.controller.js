const Empleado = require("../models/empleados.model");

exports.create = async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json({
      exito: true,
      msg: "El empleado se guardó correctamente",
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      msg: "Error al guardar el empleado",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({
      exito: false,
      msg: "Error al obtener los empleados",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({
        exito: false,
        msg: "Empleado no encontrado",
      });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({
      exito: false,
      msg: "Error al obtener el empleado",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion,
      },
      { new: true } // devuelve el documento actualizado
    );
    if (!empleadoActualizado) {
      return res.status(404).json({
        exito: false,
        msg: "Empleado no encontrado",
      });
    }
    res.status(200).json({
      exito: true,
      msg: "El empleado fue modificado correctamente",
      empleado: empleadoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      msg: "Error al modificar el empleado",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      return res.status(404).json({
        exito: false,
        msg: "Empleado no encontrado",
      });
    }
    res.status(200).json({
      exito: true,
      msg: "El empleado fue eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      msg: "Error al eliminar el empleado",
    });
  }
};
