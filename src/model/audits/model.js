import { Schema, model } from "mongoose";

// Enum for event types
const ACTIONS = ["EVENT_TYPE_1", "EVENT_TYPE_2", "EVENT_TYPE_3"]; // Add event types as needed

const AuditSchema = new Schema({
  auditAction: {
    type: String,
    required: true,
    enum: ACTIONS,
  },
  auditData: Object,
  auditStatus: Number,
  errorMessage: Object,
  auditBy: String,
  auditOn: Date,
});

const Audit = mongoose.model("Audit", AuditSchema);

export default Audit;
