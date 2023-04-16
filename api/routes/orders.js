const express = require("express");
const ordersRouter = express.Router();
const Orders = require("../models/orders");

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

ordersRouter.post("/", (req, res) => {
  Orders.create(req.body).then((order) => {
    res.status(201).send(order);
  });
});

ordersRouter.put("/:id", (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.sendStatus(204);
  });
});

ordersRouter.delete("/:id", (req, res) => {
  Orders.findByIdAndDelete(req.params.id).then(() => {
    res.sendStatus(204);
  });
});

module.exports = ordersRouter;
