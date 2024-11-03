const express = require("express");
const userRoutes = require("./src/routes/userRoutes");
const propertyRoutes = require("./src/routes/propertyRoutes");
const clientRoutes = require("./src/routes/clientRoutes");
const salesRoutes = require('./src/routes/salesRoutes');
const rentalRoutes = require("./src/routes/rentalRoutes");
const cors = require('cors');
const app = express();

app.use(express.json()); // Middleware para procesar JSON
app.use(cors({ origin: 'http://localhost:3307'}));

app.use("/api/users", userRoutes);
app.use('/api', propertyRoutes); // Rutas de propiedades
app.use("/api/clients", clientRoutes);
app.use('/api/sales', salesRoutes);
app.use("/api", rentalRoutes);

const PORT = 3307;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

