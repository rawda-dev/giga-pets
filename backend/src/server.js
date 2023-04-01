import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
const app = express();
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/user.route";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Giga Pets!");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
  app.listen(config.PORT, () => {
    console.log("Stream Mix listening on port 4000!!");
  });
}
export default app;
