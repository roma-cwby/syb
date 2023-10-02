import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { IService } from "../types/services";
import { controllers } from "../domain";
import { middlewares } from "../middlewares";
import dotenv from "dotenv";
dotenv.config();

const {PORT} = process.env || 3000;

export class Tcp implements IService {
    private static instance: Tcp;
  
    private routePrefix = "/api";
    public server = express();
  
    constructor() {
      if (!Tcp.instance) {
        Tcp.instance = this;
      }
      return Tcp.instance;
    }
  
    async init() {
      const { server, routePrefix } = this;
  
      server.use(express.json());
  
      useExpressServer(server, {
        routePrefix,
        controllers,
        middlewares,
        cors: true,
        defaultErrorHandler: true,
        validation: false,
      });
  
      return new Promise<boolean>((resolve) => {
        server.listen(PORT, () => {
          console.log(`Tcp service started on port ${PORT}`);
  
          return resolve(true);
        });
      });
    }
  }
