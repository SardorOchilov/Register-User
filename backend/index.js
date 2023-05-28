const express = require("express");
const cors = require("cors");
const { userRouter } = require("./users");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
