import { Response, Request, NextFunction } from "express";
import knex from "../database/connection";

class CategoriesController {
  // index
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await knex("categories").select("*");

      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  // show
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const category = await knex("categories").where({ id }).first();

      if (!category)
        return res.status(400).json({ message: "Category not found" });

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  // create
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, is_active } = req.body;

      const category = await knex("categories")
        .insert({
          title,
          is_active,
        })
        .returning("*");

      return res.json(category[0]);
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, is_active } = req.body;

      const category = await knex("categories")
        .where({ id })
        .update({
          title,
          is_active,
          updated_at: new Date(),
        })
        .returning("*");

      return res.json(category[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
