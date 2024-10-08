import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRouters.js";



// import swaggerUI from "swagger-ui-express";
// import Yaml from "./src/app.js";
// const yamlFilePath = "./src/api.yaml";
// const swaggerJSDocs = Yaml.load(yamlFilePath);

dotenv.config();
connectDB();

const PORT = 5000;

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api", postRoutes);
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))


app.get("/", (req, res) => {
  res.send("<h1>Hello world...</h1>");
});


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
