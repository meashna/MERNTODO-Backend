const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const path = require("path");

require("dotenv").config();
require("./conn/conn");

const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     preflightContinue: true,
//     optionsSuccessStatus: 200,
//     maxAge: 3600,
//   })
// );

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://merntodo-frontend.vercel.app",
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true, // to support cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 3600,
};

app.use(cors(corsOptions));

app.use("/api/v1", authRoutes);
app.use("/api/v2", listRoutes);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
