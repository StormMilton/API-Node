const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Importa el modelo User desde el directorio models

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // Ajustar los nombres aquí

  console.log("Cuerpo de la solicitud:", req.body);

  try {
    const existingUser = await User.findOne({ where: { email: email } }); // Cambiar correo a email
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Cambiar contraseña a password

    const newUser = await User.create({
      name, // Cambiar a name
      email, // Cambiar a email
      password: hashedPassword, // Cambiar a hashedPassword
      role, // Cambiar a role
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

// Controlador de inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};

// Controlador para obtener el perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ message: "Error al obtener el perfil", error });
  }
};

// Metodo para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Función para actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
      // Buscar el usuario por su ID
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Actualizar los campos del usuario
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      // Guardar los cambios en la base de datos
      await user.save();

      res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la URL

  try {
      const user = await User.findByPk(id); // Encuentra el usuario por su ID
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await user.destroy(); // Elimina el usuario
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ message: "Error al eliminar usuario" });
  }
};