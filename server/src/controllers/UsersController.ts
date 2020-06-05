import { Request, Response } from "express";
import knex from "../database/connection";

class UsersController {
  async index(req: Request, res: Response) {
    const users = await knex("users").select("*");

    const serializedUsers = users.map((user) => {
      return {
        ...user,
        image_url: `http://localhost:3333/uploads/${user.image}`,
      };
    });

    return res.json(serializedUsers);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await knex("users").where({ id }).first();

    if (!user) return res.status(400).json({ message: "User not found" });

    const serializedUser = {
      ...user,
      image_url: `https://localhost:3333/uploads/${user.image}`,
    };

    return res.json(serializedUser);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { is_admin, username, password, name, image } = req.body;

    const user = await knex("users")
      .where({ id })
      .update({
        is_admin,
        username,
        password,
        name,
        image,
      })
      .returning("*");

    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { is_admin, username, password, name, image } = req.body;

    const user = await knex("users")
      .insert({
        is_admin,
        username,
        password,
        name,
        image,
      })
      .returning("*");

    return res.json(user);
  }
}

export default UsersController;
