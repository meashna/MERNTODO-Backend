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
//     origin: "https://merntodo-backend.vercel.app/",
//   })
// );

app.use(
  cors({
    origin: "https://merntodo-frontend.vercel.app/",
  })
);

app.use("/api/v1", authRoutes);
app.use("/api/v2", listRoutes);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
