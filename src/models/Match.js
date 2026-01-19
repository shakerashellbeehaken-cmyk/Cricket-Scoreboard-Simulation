import mongoose from "mongoose";

const InningsSchema = new mongoose.Schema({
  battingTeam: { type: String, required: true },
  bowlingTeam: { type: String, required: true },

  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },

  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },

  target: { type: Number }, // only for 2nd innings
  completed: { type: Boolean, default: false }
}, { _id: false });

const BallEventSchema = new mongoose.Schema({
  innings: { type: Number, required: true },
  over: { type: Number, required: true },
  ball: { type: Number, required: true },

  eventType: {
    type: String,
    enum: ["RUN", "WICKET", "EXTRA"],
    required: true
  },

  runs: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const MatchSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  teamA: { type: String, required: true },
  teamB: { type: String, required: true },

  oversLimit: { type: Number, required: true },

  tossWinner: { type: String },
  tossDecision: {
    type: String,
    enum: ["bat", "bowl"]
  },

  status: {
    type: String,
    enum: ["ACTIVE", "PAUSED", "COMPLETED"],
    default: "ACTIVE"
  },

  currentInnings: { type: Number, default: 1 },

  innings1: { type: InningsSchema, required: true },
  innings2: { type: InningsSchema },

  ballEvents: [BallEventSchema],

  result: {
    winner: String,
    winByRuns: Number,
    winByWickets: Number
  }
}, { timestamps: true });

export default mongoose.models.Match ||
  mongoose.model("Match", MatchSchema);
