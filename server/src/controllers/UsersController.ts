import { Request, Response, NextFunction } from "express";
import knex from "../database/connection";
import bcrypt, { hash } from "bcrypt";

class UsersController {
  // index
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await knex("users").select("*");

      const serializedUsers = users.map((user) => {
        return {
          ...user,
          image_url: `http://localhost:3333/uploads/${user.image}`,
        };
      });

      return res.json(serializedUsers);
    } catch (error) {
      next(error);
    }
  }

  // show
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await knex("users").where({ id }).first();

      if (!user) return res.status(400).json({ message: "User not found" });

      const serializedUser = {
        ...user,
        image_url: `https://localhost:3333/uploads/${user.image}`,
      };

      const loans = await knex("loans").where({ user_id: id });

      return res.json({ user: serializedUser, loans });
    } catch (error) {
      next(error);
    }
  }

  // edit
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { is_admin, username, password, name, image } = req.body;

      const user = {
        is_admin,
        username,
        password,
        name,
        image,
        updated_at: new Date(),
      };

      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
      } else delete user.password;

      const savedUser = await knex("users")
        .where({ id })
        .update(user)
        .returning("*");

      return res.json(savedUser);
    } catch (error) {
      next(error);
    }
  }

  // create
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { is_admin, username, password, name, image } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await knex("users")
        .insert({
          is_admin,
          username,
          password: hashPassword,
          name,
          image,
        })
        .returning("*");

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
