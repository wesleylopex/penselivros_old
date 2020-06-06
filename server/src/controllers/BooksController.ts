import { Request, Response, NextFunction } from "express";
import knex from "../database/connection";

class BooksController {
  // index
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      // const { page = 1 } = req.query;
      // const books = await knex("books")
      //   .join("categories", "categories.id", "=", "books.category_id")
      //   .select("books.*", "categories.title");

      const books = await knex("books").select("*");

      return res.json(books);
    } catch (error) {
      next(error);
    }
  }

  // show
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const book = await knex("books").where({ id }).first();

      if (!book) return res.status(400).json({ message: "Book not found" });

      const serializedBook = {
        ...book,
        image_url: `https://localhost:3333/uploads/${book.image}`,
      };

      return res.json(serializedBook);
    } catch (error) {
      next(error);
    }
  }

  // search
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;

      const books = await knex("books")
        .select("*")
        .where("title", "ilike", `%${search}%`)
        // .where("author", "ilike", `%${search}%`);

      return res.json(books);
    } catch (error) {
      next(error);
    }
  }

  // create
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, author, image, user_id, reserved_at } = req.body;

      const book = await knex("books")
        .insert({
          title,
          author,
          image,
          user_id,
          reserved_at,
        })
        .returning("*");

      return res.json(book);
    } catch (error) {
      next(error);
    }
  }

  // edit
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const {
        title,
        author,
        image,
        user_id,
        reserved_at,
        category_id,
      } = req.body;

      const book = await knex("books")
        .where({ id })
        .update({
          title,
          author,
          image,
          user_id,
          reserved_at,
          updated_at: new Date(),
          category_id,
        })
        .returning("*");

      return res.json(book);
    } catch (error) {
      next(error);
    }
  }

  //delete
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await knex("books").where({ id }).del();

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default BooksController;
