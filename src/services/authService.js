// import bcrypt from "bcryptjs";
// import {
//   findUserByEmail,
//   createUser
// } from "@/repositories/userRepository";

// export async function registerUser({ name, email, password }) {
//   // 1️⃣ Check if user already exists
//   const existingUser = await findUserByEmail(email);

//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // 2️⃣ Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // 3️⃣ Create user
//   return createUser({
//     name,
//     email,
//     password: hashedPassword,
//     provider: "credentials"
//   });
// }
import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, 10);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
