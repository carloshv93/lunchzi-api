const express = require("express");
const mealsRouter = express.Router();
const Meals = require("../models/Meals");

mealsRouter.get("/", (req, res) => {
  Meals.find()
    .exec()
    .then((Meals) => {
      res.status(200).send(Meals);
    });
});

mealsRouter.get("/:id", (req, res) => {
  Meals.findById(req.params.id)
    .exec()
    .then((order) => {
      res.status(200).send(order);
    });
});

mealsRouter.post("/", (req, res) => {
  Meals.create(req.body).then((order) => {
    res.status(201).send(order);
  });
});

mealsRouter.put("/:id", (req, res) => {
  Meals.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.sendStatus(204);
  });
});

mealsRouter.delete("/:id", (req, res) => {
  Meals.findByIdAndDelete(req.params.id).then(() => {
    res.sendStatus(204);
  });
});

module.exports = mealsRouter;
