const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { authRequired } = require("./authRoute");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("../db/adapters/users");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    next({
      name: "Password Error",
      message: "Password must be over 8 characters",
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser(username, hashedPassword);
    delete user.password;

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      message: "Registration Successful",
      data: "user",
    });
  } catch (error) {
    next({
      name: "Username Already Taken",
      message: "That username is already being used",
      data: null,
    });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser(username, password);
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
    });

    res.send({ message: "Successfully logged in", data: user });
  } catch (error) {
    next({
      name: "Invalid Login Info",
      message: "The username or password is incorrect",
      data: null,
    });
  }
});

usersRouter.get("/id", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userID);
    res.send({
      message: "Getting user by Id is successful",
      data: "user",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authRequired, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByUsername(verify.username);

    res.send({ message: "Successfully got user data", data: user });
  } catch (error) {
    next({
      name: "Incorrect Information",
      message: "The login information provided is not correct",
      data: null,
    });
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

module.exports = usersRouter;
