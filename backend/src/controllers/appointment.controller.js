import Appointment from "../models/appointment.model";
import User from "../models/user.model";
import { extend } from "lodash";
export const create = async (req, res) => {
  const appointment = new Appointment(req.body);
  appointment.user = req.profile;
  try {
    await appointment.save();
    return res.status(200).json({
      message: "Appointment created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
