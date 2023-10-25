import cors from "cors";
import express, { Application, Request, Response } from "express";
import user from "./Router/authRouter";
import path from "path";
import fs from "fs";
import lodash from "lodash";

export const appConfig = (app: Application) => {
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1", user);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(400).json({
        message: "Awesome!!!...",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error",
      });
    }
  });

  //   app.get("/read", (req: Request, res: Response) => {
  //     try {

  //         const { data } = req.body;

  //       const myPath = path.join(__dirname, "data", "./db.json");

  //       fs.writeFile(myPath, JSON.stringify(data), () => {
  //         console.log("Completed");
  //       });
  //       return res.status(201).json({
  //         message: "Awesome!!!...",
  //       });
  //     } catch (error) {
  //       return res.status(400).json({
  //         message: "Error Reading",
  //         data : error.message
  //       });
  //     }
  //   });
  //   app.get("/read", (req: Request, res: Response) => {
  //     try {
  //       const findPath = path.join(__dirname, "data", "./db.json");
  //       fs.readFile(findPath, (err, resp) => {
  //         if (err) {
  //           return err;
  //         } else {
  //           const file = JSON.parse(Buffer.from(resp).toString());

  //           return res.status(200).json({
  //             message: "Reading Ext.API file",
  //             data: file,
  //           });
  //         }
  //       });
  //     } catch (error: any) {
  //       return res.status(404).json({
  //         message: "error reading from Ext.API",
  //         data: error.message,
  //       });
  //     }
  //   });

  //   app.post("/data", (req: Request, res: Response) => {
  //     try {
  //       const { data } = req.body;
  //       const findPath = path.join(__dirname, "data", "./db.json");

  //       fs.readFile(findPath, (err, resp) => {
  //         if (err) {
  //           return err;
  //         } else {
  //           const file = JSON.parse(Buffer.from(resp).toString());
  //           if (lodash.some(file, data)) {
  //             return res.status(200).json({
  //               message: "Cannot re-render from Ext.API",
  //               data: file,
  //             });
  //           } else {
  //             fs.writeFile(findPath, JSON.stringify(file).toString(), () => {
  //               console.log("completed");
  //             });

  //             return res.status(201).json({
  //               message: "Writing from Ext.API",
  //               data: file,
  //             });
  //           }
  //         }
  //       });
  //     } catch (error: any) {
  //       return res.status(404).json({
  //         message: "error writing file",
  //         data: error.message,
  //       });
  //     }
  //   });

  app.get("/read", (req: Request, res: Response) => {
    try {
      const findPath = path.join(__dirname, "data", "./db.json");

      fs.readFile(findPath, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          const file = JSON.parse(Buffer.from(resp).toString());

          return res.status(200).json({
            message: "Read File Successfully",
            data: file,
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error Reading data",
        data: error.message,
      });
    }
  });

  app.post("/data", (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      const findPath = path.join(__dirname, "data", "./db.json");

      fs.readFile(findPath, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          const file = JSON.parse(Buffer.from(resp).toString());

          if (lodash.some(file, message)) {
            return res.status(400).json({
              message: "Can't re-read",
              data: file,
            });
          } else {
            file.push(message);
            fs.writeFile(findPath, JSON.stringify(file).toString(), () => {
              console.log("completed");
            });

            return res.status(200).json({
              message: "Read Successfully",
              data: file,
            });
          }
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error Writing",
        data: error.message,
      });
    }
  });
};
