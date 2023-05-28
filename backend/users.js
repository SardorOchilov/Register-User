const express = require("express");
const { MongoClient } = require("mongodb");
const { object, string } = require("yup");
const router = express.Router();

const client = new MongoClient(
  "mongodb+srv://ochilovsardor:23052004@cluster0.wv89cud.mongodb.net/mongodb?retryWrites=true&w=majority"
);

let counter = 0;

const schema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().required(),
});

const loginSchema = object({
  email: string().required().trim(),
  password: string().required().trim(),
});

const startMdb = async(user) => {
  try {
    await client.connect()
    await client.db().createCollection('users')
    const users = client.db().collection('users')
    await users.insertOne(user)
    const showUser = await users.findOne(user)
    console.log(showUser);
  } catch (err) {
    console.log(err)
  }
}

const addUserMdb = async (user) => {
  try {
    const users = client.db().collection("users");
    await users.insertOne(user);
    const showUser = await users.findOne(user);
    console.log(showUser);
  } catch (err) {
    console.log(err);
  }
};

router.get("/", (req, res) => {
  res.send({ data: users, message: "👍🏻 users get" });
});

router.post("/login", (req, res) => {
  try {
    const isExist = users.find(
      (user) =>
        user.email === req.body.email && user.password === req.body.password
    );
    if (!isExist)
      res
        .status(400)
        .send({ data: null, message: "This email or password is invallid" });
    else {
      res.send({ message: "created user" });
    }
  } catch (err) {
    res.status(400).send({ data: null, message: err.message });
  }
});

router.post("/register", (req, res) => {
  try {
    const isExist = users.find(
      (user) =>
        user.email === req.body.email || user.username === req.body.username
    );

    if (isExist)
      res
        .status(400)
        .send({ data: null, message: "This email or username already exist" });
    else {
      const user = { ...req.body, id: ++counter };
      users.push(user);
      mongoStart(user);
      res.send({ data: user, message: "created user" });
    }
  } catch (err) {
    res.status(400).send({ data: null, message: err.message });
  }
});

module.exports = {
  userRouter: router,
};
