const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Conexión a MongoDB
const connect = () => {
  mongoose.connect(`mongodb+srv://AdminDiego:diegomongo@firstcluster.zlv30.mongodb.net/?retryWrites=true&w=majority`);

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.error("Error en la conexion");
  });

  connection.on("open", () => {
    console.log("Conectado!");
  });
};

connect();

// Modelos
const personaSchema = new mongoose.Schema({
  CI: { type: String, unique: true, required: true },
  Nombre: String,
  Apellido: String,
  Edad: Number,
});

const Persona = mongoose.model("Persona", personaSchema);

const direccionSchema = new mongoose.Schema({
  Departamento: String,
  Localidad: String,
  Calle: String,
  Nro: String,
  Apartamento: String,
  Padron: String,
  Ruta: String,
  Km: String,
  Letra: String,
  Barrio: String,
});

const Direccion = mongoose.model("Direccion", direccionSchema);

const domicilioSchema = new mongoose.Schema({
  Datos_Persona: { type: mongoose.Schema.Types.ObjectId, ref: "Persona" },
  Direccion: { type: mongoose.Schema.Types.ObjectId, ref: "Direccion" },
});

const Domicilio = mongoose.model("Domicilio", domicilioSchema);

app.use(bodyParser.json());

// Operación 1: Agregar Persona
app.post("/api/agregarPersona", async (req, res) => {
    try {
      const personaData = req.body;
  
      // Verifica si la persona ya existe
      const existingPersona = await Persona.findOne({ CI: personaData.CI });
      if (existingPersona) {
        return res.status(401).json({ mensaje: "La persona ya existe" });
      }
  
      // Crea una nueva persona
      const nuevaPersona = new Persona(personaData);
      await nuevaPersona.save();
  
      res.json({ mensaje: "Persona agregada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });
  
  // Operación 2: Agregar Domicilio
  app.post("/api/agregarDomicilio/:CI", async (req, res) => {
    try {
      const ciPersona = req.params.CI;
      const direccionData = req.body;
  
      // Verifica si la persona existe
      const personaExistente = await Persona.findOne({ CI: ciPersona });
      if (!personaExistente) {
        return res.status(402).json({ mensaje: "No existe una persona con la cédula proporcionada" });
      }
  
      // Crea una nueva dirección
      const nuevaDireccion = new Direccion(direccionData);
      await nuevaDireccion.save();
  
      // Crea un nuevo domicilio asociado a la persona y dirección
      const nuevoDomicilio = new Domicilio({
        Datos_Persona: personaExistente._id,
        Direccion: nuevaDireccion._id,
      });
      await nuevoDomicilio.save();
  
      res.json({ mensaje: "Domicilio agregado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });
  
  // Operación 3: Consultar Domicilio
  app.get("/api/consultarDomicilio/:CI", async (req, res) => {
    try {
      const ciPersona = req.params.CI;
      const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
      const pageSize = parseInt(req.query.pageSize) || 5; // Tamaño de página, por defecto 1
  
      // Verifica si la persona existe
      const personaExistente = await Persona.findOne({ CI: ciPersona });
      if (!personaExistente) {
        return res.status(402).json({ mensaje: "No existe una persona con la cédula proporcionada" });
      }
  
      // Calcula el índice de inicio y fin para la paginación
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
  
      // Obtiene todos los domicilios asociados a la persona con paginación
      const domicilios = await Domicilio.find({ Datos_Persona: personaExistente._id })
        .populate("Direccion")
        .sort({ _id: -1 })
        .skip(startIndex)
        .limit(pageSize);
  
      // Construye el objeto de respuesta con información de paginación
      const response = {
        pageInfo: {
          currentPage: page,
          pageSize: pageSize,
          totalPages: Math.ceil(domicilios.length / pageSize),
        },
        domicilios: domicilios,
      };
  
      // Si hay más elementos, agrega un enlace al siguiente elemento
      if (endIndex < domicilios.length) {
        response.nextItemLink = `/api/consultarDomicilio/${ciPersona}?page=${page + 1}&pageSize=${pageSize}`;
      }
  
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });
  
  // Operación 4: Obtener Domicilios por Criterio
  app.get("/api/obtenerDomiciliosPorCriterio", async (req, res) => {
    try {
      const { barrio, localidad, departamento } = req.query;
  
      // Construye el criterio de búsqueda
      const criterioBusqueda = {};
      if (barrio) criterioBusqueda.Barrio = barrio;
      if (localidad) criterioBusqueda.Localidad = localidad;
      if (departamento) criterioBusqueda.Departamento = departamento;
  
      // Obtiene todos los domicilios que cumplen con el criterio
      const domicilios = await Domicilio.find(criterioBusqueda)
        .populate("Datos_Persona")
        .populate("Direccion");
  
      res.json({ domicilios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
