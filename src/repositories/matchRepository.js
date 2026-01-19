// import Match from "@/models/Match";
// import { connectDB } from "@/lib/db";

// export async function createMatch(data) {
//   await connectDB();
//   return Match.create(data);
// }

// export async function getMatchById(id) {
//   await connectDB();
//   return Match.findById(id);
// }

// export async function updateMatch(id, data) {
//   await connectDB();
//   return Match.findByIdAndUpdate(id, data, { new: true });
// }

// /**
//  * ❌ Admin / debugging use only
//  * Do NOT use this in user dashboard
//  */
// export async function getAllMatches() {
//   await connectDB();
//   return Match.find().sort({ createdAt: -1 });
// }

// /**
//  * ✅ CORRECT function for user dashboard
//  * Returns ONLY matches owned by the logged-in user
//  */
// export async function getMatchesByUser(userId) {
//   await connectDB();
//   return Match.find({ createdBy: userId }).sort({ createdAt: -1 });
// }
import Match from "@/models/Match";

export const createMatch = (data) => {
  return Match.create(data);
};

export const findMatchById = (id) => {
  return Match.findById(id);
};

export const updateMatch = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

export const findMatchesByUser = (userId) => {
  return Match.find({ createdBy: userId }).sort({ createdAt: -1 });
};
