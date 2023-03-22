const express = require("express");
const {
  getItem,
  getItems,
  createItem,
  deleteItem,
  updateItem,
} = require("./../controllers/itemController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

// GET all Items
router.get("/", getItems);

//GET a single Item
router.get("/:id", getItem);

// POST a new Item
router.post("/", createItem);

// DELETE a Item
router.delete("/:id", deleteItem);

// UPDATE a Item
router.patch("/:id", updateItem);

module.exports = router;
