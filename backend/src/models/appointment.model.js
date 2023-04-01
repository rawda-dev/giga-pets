import mongoose from "mongoose";
const { Schema } = mongoose;
const appointmentSchema = new Schema({
  petName: {
    type: String,
    required: "Pet name is required",
  },
  ownerName: {
    type: String,
    required: "Owner name is required",
  },
  aptNotes: {
    type: String,
    required: "Appointment Notes required",
  },
  aptDate: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Appointment", appointmentSchema);