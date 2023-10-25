import express, { Application } from "express";
import { appConfig } from "./mainApp";
import { dbConfig } from "./Config/db";

const port: number = 3689;

const app: Application = express();
appConfig(app)
dbConfig()

const server = app.listen(port, () => {
  console.log("Server Active");
});
