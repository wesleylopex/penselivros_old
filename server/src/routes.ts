import express from "express";
import UsersController from "./controllers/UsersController";

// index, show, create, update, delete

const routes = express.Router();
const usersController = new UsersController();

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.put("/users/:id", usersController.edit);
routes.post("/users", usersController.create);

export default routes;
