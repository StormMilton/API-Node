const express = require('express');
const propertyController = require('../controllers/propertyController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

// Configuración de almacenamiento de `multer`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define la carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Define el nombre del archivo
    }
});

// Inicializa `multer` con la configuración de almacenamiento y limita los tipos de archivos a imágenes
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Acepta el archivo si es una imagen
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false); // Rechaza otros tipos de archivos
        }
    }
});


router.get('/properties', propertyController.getAvailableProperties); // Obtener propiedades disponibles
router.get('/properties/:id', propertyController.getPropertyById);
router.post('/properties', upload.single('image'), authenticateToken, propertyController.createProperty); // Registrar propiedad
router.put('/properties/:id', authenticateToken, propertyController.updateProperty); // Actualizar propiedad
router.delete('/properties/:id', authenticateToken, propertyController.deleteProperty); // Eliminar propiedad

module.exports = router;
