// import User from "@/models/User";
// import { connectDB } from "@/lib/db";

// export async function findUserByEmail(email) {
//   await connectDB();
//   return User.findOne({ email });
// }

// export async function createUser(data) {
//   await connectDB();
//   return User.create(data);
// }
import User from "@/models/User";

export const createUser = (data) => {
  return User.create(data);
};

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const addMatchToUser = (userId, matchId) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { matchHistory: matchId } },
    { new: true }
  );
};
