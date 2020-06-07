import { Response, Request, NextFunction } from "express";
import knex from "../database/connection";

class LoansController {
  // index
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const loans = await knex("loans").select("*");

      return res.json(loans);
    } catch (error) {
      next(error);
    }
  }

  // show
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const loan = await knex("loans").where({ id }).first();

      if (!loan) return res.status(400).json({ message: "Loan not found" });

      return res.json(loan);
    } catch (error) {
      next(error);
    }
  }

  // create
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id, book_id } = req.body;

      const trx = await knex.transaction();

      const loan = await trx("loans")
        .insert({
          user_id,
          book_id,
        })
        .returning("*");

      const book = trx("books").where({ id: book_id }).update({
        reserved_at: null,
      });

      return res.json(loan[0]);
    } catch (error) {
      next(error);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const loan = await knex("loans")
        .where({ id })
        .update({
          finished_at: new Date(),
        })
        .returning("*");

      return res.json(loan[0]);
    } catch (error) {
      next(error);
    }
  }
}

export default LoansController;
