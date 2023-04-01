import app from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
import Appointment from "../models/appointment.model";
import User from "../models/user.model";
import { connect } from "../utils/dbConnection";
import { user, createUser, getUserHeader } from "./authHeader";
const request = supertest(app);
beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async () => {
  await Appointment.deleteMany({});
  await User.deleteMany({});
});

describe("POST /api/appointments", () => {
  test("should create an appointment", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .post(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}`)
      .send({
        petName: "Test",
        aptNotes: "Test",
        aptDate: "2022-04-01",
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Appointment created successfully");
  });
  test("should not create an appointment with an invalid data", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .post(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}`)
      .send({
        aptNotes: "Test",
        aptDate: "2022-04-01",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Something went wrong");
  });
});
