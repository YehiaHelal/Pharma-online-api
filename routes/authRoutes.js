const { Router } = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = Router();

// so this is esstenailly the middle-ware which is between the frontend React and The Backend DB

// router.get("/signup", ); // to get some info from the backend DB   // we can set the function here or we add the controller for cleaner code

router.post("/signup", userController.createUser_post); // to form/create a doc on the backend DB // we can set the function here or we add the controller for cleaner code
router.post("/login", userController.loginUser_post); // to get some info from the backend DB // we can set the function here or we add the controller for cleaner code
router.post("/logout", userController.logoutUser_post); // posting here we send just an empty cookie with 1sec timer and message logout done

router.post(
  "/profile",
  authController.requireAuth,
  userController.profileDataGet_post
);

router.post(
  "/updateinfo",
  authController.requireAuth,
  userController.updateUser_post
);

// Restricted to admin //

//get all users
router.get(
  "/admin/getallusers",
  authController.requireAuth,
  authController.restrictTo,
  userController.getUsers_post
);

//delete user
router.post(
  "/admin/getallusers",
  authController.requireAuth,
  authController.restrictTo,
  userController.deleteUser_post
);

module.exports = router;
