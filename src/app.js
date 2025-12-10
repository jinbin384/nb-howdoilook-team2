import express from "express";
import styleRouter from "./src/routes/style.router.js";

const app = express();

app.use(express.json());
app.use("/styles", styleRouter);

export default app;
