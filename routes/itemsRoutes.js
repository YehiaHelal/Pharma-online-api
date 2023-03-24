const express = require("express");
const itemController = require("./../controllers/itemController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

// GET all Items
router.get("/", itemController.getItems);

//GET a single Item
router.get("/:id", itemController.getItem);

// for admin  //

// add a new Item
router.post(
  "/",
  authController.requireAuth,
  authController.restrictTo,
  itemController.createItem_post
);

// delete a Item
router.delete(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  itemController.deleteItem_post
);

// update a Item
router.patch(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  itemController.updateItem_post
);

module.exports = router;
