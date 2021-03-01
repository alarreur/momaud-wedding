// express
import * as express from "express";
import { Express, Request, Response } from "express";

// firebase
import * as functions from "firebase-functions";

export abstract class BaseCrudModule {
  public readonly config: Express;
  public readonly logger: typeof functions.logger;

  constructor(public readonly name: string) {
    this.logger = functions.logger;

    this.config = express();
    this.config.get("/", this.list.bind(this));
    this.config.get("/:id", this.get.bind(this));
    this.config.post("/", this.create.bind(this));
    this.config.put("/:id", this.update.bind(this));
    this.config.delete("/:id", this.delete.bind(this));
  }

  public abstract list(request: Request, response: Response): void;

  public abstract get(request: Request, response: Response): void;

  public abstract create(request: Request, response: Response): void;

  public abstract update(request: Request, response: Response): void;

  public abstract delete(request: Request, response: Response): void;
}
