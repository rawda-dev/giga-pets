import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
const app = express();
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/user.route";
import appointmentsRouter from "./routes/appointment.route";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Giga Pets!");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api", appointmentsRouter);
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
    console.log("Giga Pets listening on port 4000!!");
  });
}
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
