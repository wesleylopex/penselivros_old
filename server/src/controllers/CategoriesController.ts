import { Response, Request, NextFunction } from "express";
import knex from "../database/connection";

class CategoriesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = knex("categories").select("*");

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
