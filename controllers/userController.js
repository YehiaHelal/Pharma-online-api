const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// jsonwebtoken -- create token
const maxAge = 30 * 24 * 60 * 60; // 90 days token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, { expiresIn: maxAge });
};

// create new user
const createUser_post = async (req, res) => {
  const { email, password, name } = req.body.submission; // from the req.body sent from the frontend

  // name
  // here we are using de-structing assigning name and email and password to , from the request body we got.

  let emptyFields = [];

  // if (!name) {
  //   emptyFields.push("name");
  // }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (!name) {
    emptyFields.push("name");
  }

  if (emptyFields > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }

  try {
    const user = await User.create({ email, password, name });
    // jwt cookie send
    // const token = createToken(user._id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // this maxAge is in milisecond while jwt is in seconds maxage

    // sending a cookie response ..
    // res.cookie("Hi", true);

    // after we send a jwt token for the browser-frontend
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// login a user and send back a cookie and the user&token in a message back
const loginUser_post = async (req, res) => {
  const { email, password } = req.body.submission;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "No such user found" });
  }

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw res.status(400).json({ error: "incorrect password" });
    }
  }

  //  jwt cookie send // sending the cookie from here
  const token = createToken(user._id);

  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // this maxAge is in milisecond while jwt is in seconds maxage

  // sending a cookie response ..
  // res.cookie("Hi", true);

  // after we send a jwt token for the browser-frontend
  // send the token and user email as data from here
  res.status(200).json({ user: user.email, token });
};

const profileDataGet_post = async (req, res) => {
  // we already have the current user and everything from the check auth protect and we assigned the user data
  // to inside the req itself which is passed to here
  // the req.current , res.locals will be passed to the next middleware so we have them .

  console.log(req.current);
  console.log(res.locals.user);

  // const { authorization } = req.headers;

  // const token = authorization.split(" ")[1];

  // console.log(token);

  // const { _id } = jwt.verify(token, process.env.SECRET);

  // console.log(_id);

  // req.user = await User.findOne({ _id }).select("_id");

  // console.log(req.user);

  res.status(200).json({ user: res.locals.user });
};

// loggingout user - we send just an empty cookie with 1sec timer and message "logout done"
const logoutUser_post = async (req, res) => {
  //

  // sending the empty 1sec expirey data cookie to replace the jwt on the browser
  res.cookie("jwt", "", { maxAge: 10 }); // this works in second so this means 1 sec

  res.status(200).json({ message: "logout done" });
};

////////////////////////////

// update user data

const updateUser_post = async (req, res) => {
  console.log(req.user);
  console.log(res.locals.user.email);

  const { name, address } = req.body.submission;

  console.log(name, address);

  const user = await User.findOneAndUpdate(
    { email: res.locals.user.email },
    { name: name, address: address },
    {
      new: true,
    }
  );

  console.log(user);

  // return res.status(404).json({ error: "No such user" });

  // const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  // if (!user) {
  //   return res.status(400).json({ error: "No such user" });
  // }

  res.status(200).json({ user: res.locals.user, message: { user } });
};

// delete a user

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // so avoid  id } = req.params.id ?!

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(user);
};

//   data   //

// get all users

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({});

  // a normal cookie send
  // res.cookie("JWT-Test", false, { maxAge: 1000 * 60 * 60 * 24 }); - // setting the age for it to stay even if the browser was closed
  // 1000 milisecond * 60 sec * 60 minute * 24 hour
  res.cookie("users-cookie", true);
  res.status(200).json(users); // res.status 200 means ok
};

// get a single user

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.cookie("JWT-Test", true);
  res.status(200).json(user);
};

module.exports = {
  createUser_post,
  loginUser_post,
  profileDataGet_post,
  logoutUser_post,
  updateUser_post,
  deleteUser,
  getUser,
  getUsers,
};
