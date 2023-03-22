const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// create new user
const cartOrder_post = async (req, res) => {
  console.log(req.body.OrderDetails);
  const { orderProducts, orderTotalValue } = req.body.OrderDetails; // from the req.body sent from the frontend

  // console.log(orderProducts, orderTotalValue);

  // console.log(req.current);

  // console.log(res.locals.user);

  // console.log(res.locals.user.email);

  try {
    const order = await Order.create({
      orderProducts,
      orderTotalValue,
      user: res.locals.user.email,
    });

    // console.log(order);

    res.status(200).json({ message: "order placed and on it's way" });
  } catch (error) {
    res.status(400).json({ error: "there was an error" });
  }
};

// get user orders
const getuserorders_post = async (req, res) => {
  const userorders = await Order.find({ user: res.locals.user.email });
  console.log(userorders);

  console.log(res.locals.user.email);

  // console.log(req.body.OrderDetails);
  // const { orderProducts, orderTotalValue } = req.body.OrderDetails; // from the req.body sent from the frontend

  // try {
  //   const order = await Order.create({
  //     orderProducts,
  //     orderTotalValue,
  //     user: res.locals.user.email,
  //   });

  res.status(200).json({ message: "all your orders", orders: userorders });
  // } catch (error) {
  //   res.status(400).json({ error: "there was an error" });
  // }
};

module.exports = {
  cartOrder_post,
  getuserorders_post,
};
