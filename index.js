const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Connection to the database
require("./conn/conn");

// Routes
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

// Middleware for parsing application/json
app.use(express.json());

// Middleware for CORS
app.use(
  cors({
    origin: "*", // Allows requests from all origins
    credentials: true, // Allows cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed HTTP headers
    preflightContinue: true, // Moves the request to the next middleware if the preflight request is successful
  })
);

// Setup CORS headers for all responses
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allows all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API routes
app.use("/api/v1", authRoutes);
app.use("/api/v2", listRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
