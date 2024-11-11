const express = require("express");
const userRoutes = require("./src/routes/userRoutes");
const propertyRoutes = require("./src/routes/propertyRoutes");
const clientRoutes = require("./src/routes/clientRoutes");
const salesRoutes = require('./src/routes/salesRoutes');
const rentalRoutes = require("./src/routes/rentalRoutes");
const cors = require('cors');
const app = express();

app.use(express.json()); // Middleware para procesar JSON

app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use("/api/users", userRoutes);
app.use('/api', propertyRoutes); 
app.use("/api/clients", clientRoutes);
app.use('/api/sales', salesRoutes);
app.use("/api", rentalRoutes);

app.use('/uploads', express.static('uploads'));

app.use(express.json()); // permite que el backend procese JSON en `req.body`

const PORT = 3307;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

