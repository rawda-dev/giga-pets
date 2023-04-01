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
describe("GET /api/users/:userId/appointments", () => {
  test("should get all appointments", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res1 = await request
      .post(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}`)
      .send({
        petName: "Test",
        aptNotes: "Test",
        aptDate: "2022-04-01",
      });
    expect(res1.status).toBe(200);
    const res = await request
      .get(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].petName).toBe("Test");
    expect(res.body[0].aptNotes).toBe("Test");
  });
  test("should not get all appointments with an invalid user id", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/123/appointments`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Could not retrieve user");
  });
  test("should not get all appointments with an invalid token", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}123`);
    expect(res.status).toBe(401);
    expect(res.body.error).toContain("Unauthorized");
  });
});
describe("GET /api/users/:userId/appointments/:aptId", () => {
  test("should get an appointment", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res1 = await request
      .post(`/api/users/${user._id}/appointments`)
      .set("Authorization", `Bearer ${authHeader}`)
      .send({
        petName: "Test",
        aptNotes: "Test",
        aptDate: "2022-04-01",
      });
      const appointment = await Appointment.findOne({user: user._id});
    expect(res1.status).toBe(200);
    const res = await request
      .get(`/api/users/${user._id}/appointments/${appointment._id}`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(200);
    expect(res.body.petName).toBe("Test");
    expect(res.body.aptNotes).toBe("Test");
  });
  test("should not get an appointment with an invalid user id", async () => {
    await createUser();
    const authHeader = await getUserHeader();
    const res = await request
      .get(`/api/users/123/appointments/123`)
      .set("Authorization", `Bearer ${authHeader}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Could not retrieve user");
  });

});
