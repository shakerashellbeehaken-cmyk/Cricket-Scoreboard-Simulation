// import { registerUser } from "@/services/authService";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, password } = body;

//     // 1️⃣ Validate input
//     if (!name || !email || !password) {
//       return Response.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     if (password.length < 6) {
//       return Response.json(
//         { error: "Password must be at least 6 characters" },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Call service
//     await registerUser({ name, email, password });

//     // 3️⃣ Respond success
//     return Response.json(
//       { message: "User registered successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     return Response.json(
//       { error: error.message },
//       { status: 400 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TEMPORARY: service layer not ready yet
    return Response.json(
      { message: "Registration temporarily disabled (dev mode)" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
