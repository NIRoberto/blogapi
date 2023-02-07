import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoute from "./routes/user";
import postRoute from "./routes/blog";

const app = express();

app.use(cors());
app.use(morgan("dev"));

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", postRoute);

app.use("/api/v1", userRoute);

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
