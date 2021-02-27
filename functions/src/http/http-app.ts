// express
import * as express from "express";
import { Express } from "express";

// firebase
import * as functions from "firebase-functions";

// local
import { BaseCrudModule } from "./base-crud-module";

export class HttpApp {
  private readonly _config: Express;

  constructor() {
    this._config = express().use(express.json());
  }

  public attach(module: BaseCrudModule): HttpApp {
    this._config.use(`/${module.name}`, module.config);
    return this;
  }

  public export() {
    // expose Express API as a single Cloud Function
    return functions.region("europe-west1").https.onRequest(this._config);
  }
}
