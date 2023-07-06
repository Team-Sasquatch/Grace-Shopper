const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { authRequired } = require("./authRoute");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateAddress,
} = require("../db/adapters/users");
const { getAllOrdersByUserId } = require("../db/adapters/orders");
const { users } = require("../db/seedData");

usersRouter.get("/users", (req, res) => {
  res.send("This is the users page!");
});

usersRouter.post("/mypost", function (req, res) {
  res.send("Got a POST request for /user");
});

usersRouter.post("/register", async (req, res, next) => {
  const {
    username,
    password,
    is_admin,
    address,
    address2,
    city,
    state,
    zipcode,
  } = req.body;
  if (password.length < 8) {
    next({
      name: "PasswordError",
      message: "Please supply a password that's over 8 characters",
    });
  } else {
    try {
      console.log("Trying to get user by username");
      const _user = await getUserByUsername(username);
      if (_user) {
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }
      const user = await createUser({
        username,
        password,
        is_admin,
        address,
        address2,
        city,
        state,
        zipcode,
      });

      // create token send a cookie
      res.send({
        message: "Register Successful",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  } else {
    try {
      const _user = await getUserByUsername(username);
      if (!_user) {
        next({
          name: "UserDoesNotExistError",
          message: "A user by that username does not exist",
        });
      }
      const user = await getUser({ username, password });
      if (user) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "2w",
        });
        res.cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
        });
        res.send({
          message: "Login Successful",
          user,
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (error) {
      next(error);
    }
  }
});

usersRouter.get("/id/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    res.send({
      user,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
    // pull id out of req.user and query db
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/logout", authRequired, async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/orders", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await getAllOrdersByUserId(userId);
    res.send({
      orders,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/id/:id", authRequired, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { address, address2, city, state, zipcode } = req.body;
    const user = await updateAddress({
      id,
      address,
      address2,
      city,
      state,
      zipcode,
    });
    if (user) {
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
