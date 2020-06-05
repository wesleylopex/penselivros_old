import express, { response } from "express";
import router from "./routes";
import path from "path";

const app = express();

// middlewares
app.use(express.json());
app.use(router);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
