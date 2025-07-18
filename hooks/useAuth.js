"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import verifyToken from "@/utils/verifyToken";
import Swal from "sweetalert2";

export default function useAuth({ requiredRole = null } = {}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = () => {
      const tokenData = verifyToken();

      if (!tokenData) {
        Swal.fire({
          icon: "error",
          title: "Access Denied!",
          text: "Please sign in first.",
          timer: 3000,
          showConfirmButton: false,
        });
        return router.push("/signin");
      }

      const userRole = tokenData.userRole;

      if (requiredRole && userRole !== requiredRole) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You don't have permission to access this page.",
          timer: 3000,
          showConfirmButton: false,
        });
        return router.push("/");
      }

      setUser(tokenData);
      setLoading(false);
    };

    check();
  }, [requiredRole, router]);

  return { user, loading };
}
// ("use client");

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { useSession } from "next-auth/react";
// import verifyToken from "@/utils/verifyToken";

// export default function useAuth({ requiredRole = null } = {}) {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       // Check manual login first (from cookie)
//       const tokenData = verifyToken();

//       if (tokenData) {
//         const userRole = tokenData.userRole;

//         if (requiredRole && userRole !== requiredRole) {
//           Swal.fire({
//             icon: "error",
//             title: "Unauthorized",
//             text: "You don't have permission to access this page.",
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           return router.push("/");
//         }

//         setUser({ type: "manual", ...tokenData });
//         setLoading(false);
//         return;
//       }

//       // If no token in cookie, check NextAuth session (Google login)
//       if (status === "loading") return;

//       if (!session) {
//         Swal.fire({
//           icon: "error",
//           title: "Access Denied!",
//           text: "Please sign in first.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         return router.push("/signin");
//       }

//       const role = session.user?.role;
//       if (requiredRole && role !== requiredRole) {
//         Swal.fire({
//           icon: "error",
//           title: "Unauthorized",
//           text: "You don't have permission to access this page.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         return router.push("/");
//       }

//       setUser({ type: "google", ...session.user });
//       setLoading(false);
//     };

//     checkAuth();
//   }, [status, session, requiredRole, router]);

//   return {
//     user,
//     accessToken: user?.accessToken ?? session?.accessToken ?? null,
//     loading,
//   };
// }
