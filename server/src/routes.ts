import express from "express";
import { celebrate } from "celebrate";

import UsersController from "./controllers/UsersController";
import BooksController from "./controllers/BooksController";
import CategoriesController from "./controllers/CategoriesController";

import usersValidation from "./validations/usersValidation";
import booksValidation from "./validations/booksValidation";

// index, show, create, update, delete

const routes = express.Router();
const usersController = new UsersController();
const booksController = new BooksController();
const categoriesController = new CategoriesController();

// users
routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.post("/users", celebrate(usersValidation), usersController.create);
routes.put("/users/:id", usersController.edit);

// books
routes.get("/books", booksController.index);
routes.get("/books/search", booksController.search);
routes.get("/books/:id", booksController.show);
routes.post("/books", celebrate(booksValidation), booksController.create);
routes.put("/books/:id", booksController.edit);
routes.delete("/books/:id", booksController.delete);

// categories
routes.get("/categories", categoriesController.index);
routes.get("/categories/:id", categoriesController.show);
routes.post("/categories", categoriesController.create);
routes.put("/categories/:id", categoriesController.edit);

export default routes;
