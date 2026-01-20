import mongoose from "mongoose";

const InningsSchema = new mongoose.Schema(
  {
    battingTeam: { type: String, required: true },
    bowlingTeam: { type: String, required: true },

    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },

    overs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },

    target: { type: Number, default: null }, // only for 2nd innings
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const BallEventSchema = new mongoose.Schema(
  {
    innings: { type: Number, required: true },
    over: { type: Number, required: true },
    ball: { type: Number, required: true },

    eventType: {
      type: String,
      enum: ["RUN", "WICKET", "EXTRA"],
      required: true,
    },

    runs: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const MatchSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teamA: { type: String, required: true },
    teamB: { type: String, required: true },

    oversLimit: { type: Number, required: true },

    toss: {
  winner: { type: String, default: null },
  decision: {
    type: String,
    enum: ["bat", "bowl"],
    default: null,
  },
},


status: {
  type: String,
  enum: ["CREATED", "IN_PROGRESS", "PAUSED", "COMPLETED"],
  default: "CREATED",
},

    // 🔑 IMPORTANT: first innings index is 0, not 1
    currentInnings: { type: Number, default: 0 },

    // 🔑 IMPORTANT: innings is OPTIONAL at match creation
    innings: {
      type: [InningsSchema],
      default: [],
    },

    ballEvents: {
      type: [BallEventSchema],
      default: [],
    },

    result: {
      winner: { type: String, default: null },
      winByRuns: { type: Number, default: null },
      winByWickets: { type: Number, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Match ||
  mongoose.model("Match", MatchSchema);


  