const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();

// const router = express.Router();

// GET all orders
router.post(
  "/getuserorders",
  authController.requireAuth,
  orderController.getuserorders_post
);

// //GET a single order
// router.get("/:id", getorder);

// // POST a new order
// router.post("/", createorder);

// // DELETE a order
// router.delete("/:id", deleteorder);

// // UPDATE a order
// router.patch("/:id", updateorder);

// module.exports = router;

router.post(
  "/cartorder",
  authController.requireAuth,
  orderController.cartOrder_post
);

module.exports = router;
