const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./conn/conn");

//Proxy setting for API
// const { createProxyMiddleware } = require("http-proxy-middleware");
// app.use(
//   "/api",
//   createProxyMiddleware({ target: "http://localhost:5173", changeOrigin: true })
// );

const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
    // optionsSuccessStatus: 200,
    // maxAge: 3600,
  })
);

app.use("/api/v1", authRoutes);
app.use("/api/v2", listRoutes);

// app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
