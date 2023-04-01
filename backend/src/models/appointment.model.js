import mongoose from "mongoose";
const { Schema } = mongoose;
const appointmentSchema = new Schema({
  petName: {
    type: String,
    required: "Pet name is required",
  },
  
  aptNotes: {
    type: String,
    required: "Appointment Notes required",
  },
  aptDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});
export default mongoose.model("Appointment", appointmentSchema);