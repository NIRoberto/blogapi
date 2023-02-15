import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoute from "./routes/user";
import letterRoute from "./routes/letter";
import postRoute from "./routes/blog";
import upload from "./helpers/multer";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API documentation",
      version: "1.0.0",
      description: "All blog endpoint API documentation using swagger",
    },
    servers: [
      {
        url: "http://127.0.0.1:5000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use(cors());
app.use(morgan("dev"));

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.single("image"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", letterRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    author: req.user,
    message: "Welcome to my API",
  });
});

app.use("*", (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL",
  });
});
export default app;
