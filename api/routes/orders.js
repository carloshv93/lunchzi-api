const express = require("express");
const ordersRouter = express.Router();
const { isAuthenticated, hasRoles } = require("../auth");
const Orders = require("../models/Orders");

ordersRouter.get("/", (req, res) => {
  Orders.find()
    .exec()
    .then((orders) => {
      res.status(200).send(orders);
    });
});

ordersRouter.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then((order) => {
      res.status(200).send(order);
    });
});

ordersRouter.post("/", isAuthenticated, (req, res) => {
  const { _id } = req.user;
  Orders.create({ ...req.body, user_id: _id }).then((order) => {
    res.status(201).send(order);
  });
});

ordersRouter.put(
  "/:id",
  isAuthenticated,
  hasRoles(["admin", "user"]),
  (req, res) => {
    Orders.findByIdAndUpdate(req.params.id, req.body).then(() => {
      res.sendStatus(204);
    });
  }
);

ordersRouter.delete(
  "/:id",
  isAuthenticated,
  hasRoles(["admin"]),
  (req, res) => {
    Orders.findByIdAndDelete(req.params.id).then(() => {
      res.sendStatus(204);
    });
  }
);

module.exports = ordersRouter;
