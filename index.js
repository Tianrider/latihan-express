const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const userRouter = require("./routes/user.router");
const messageRouter = require("./routes/message.router");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/message", messageRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
