// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // ✅ Allow public routes
//   if (
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/signup") ||
//     pathname.startsWith("/api/auth")
//   ) {
//     return NextResponse.next();
//   }

//   const token = await getToken({ req });

//   // ❌ Redirect unauthenticated users
//   if (!token) {
//     return NextResponse.redirect(
//       new URL("/login", req.url)
//     );
//   }

//   return NextResponse.next();
// }


import { NextResponse } from "next/server";

export function middleware(req) {
  return NextResponse.next();
}

