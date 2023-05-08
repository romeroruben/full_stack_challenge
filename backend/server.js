const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configuración de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());

// Configuración de rutas
const routes = require('./routes/fileRoutes');
app.use('/', routes);

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;

