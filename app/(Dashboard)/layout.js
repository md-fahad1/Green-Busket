// app/(dashboard)/layout.js
// ❌ DO NOT put "use client" here

import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata = {
  title: "Admin | Ceramic & Food Products",
  description: "Manage orders, products, and users in your admin dashboard.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Admin Dashboard - Ceramic & Food Products",
    description:
      "Secure admin dashboard for managing ceramic and food products.",
    url: "https://ceramicandfoodproducts.com/dashboard",
    siteName: "Ceramic & Food Products",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard | Ceramic & Food Products",
    description: "Manage your products, orders, and analytics.",
    images: ["/logo1.png"],
  },
};

export default function Layout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}

// "use client";
// import theme from "@/components/theme";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
// import StoreProvider from "@/app/StoreProvider";
// import DashboardHeader from "@/components/Dashboard/DashboardHeader/DashboardHeader";
// import HandlerProvider from "@/lib/providers/HandlerProvider";
// import SideNavBar from "@/components/Dashboard/Sidebar/SideNavBar";
// import useAuth from "@/hooks/useAuth";
// import Loading from "../loading";
// import { Suspense } from "react";

// export const metadata = {
//   title: "Admin  | Ceramic & Food Products",
//   description: "Manage orders, products, and users in your admin dashboard.",
//   keywords: [
//     "admin dashboard",
//     "product management",
//     "order tracking",
//     "ceramic",
//     "food products",
//   ],
//   robots: "noindex, nofollow",
//   openGraph: {
//     title: "Admin Dashboard - Ceramic & Food Products",
//     description:
//       "Secure admin dashboard for managing ceramic and food products.",
//     url: "https://ceramicandfoodproducts.com/dashboard",
//     siteName: "Ceramic & Food Products",
//     images: [
//       {
//         url: "/logo1.png",
//         width: 1200,
//         height: 630,
//         alt: "Dashboard Overview",
//       },
//     ],
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Admin Dashboard | Ceramic & Food Products",
//     description: "Manage your products, orders, and analytics.",
//     images: ["/logo1.png"],
//   },
// };
// export default function DashboardLayout({ children }) {
//   const { user, loading } = useAuth({ requiredRole: "admin" });

//   if (loading)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   return (
//     // <html lang="en">
//     //   <body className="bg-[#F0F0F5] dark:bg-[#0f1214]">
//     <HandlerProvider>
//       <AppRouterCacheProvider>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <StoreProvider>
//             <div className="lg:grid lg:grid-cols-12 ">
//               <section className="lg:col-span-2">
//                 <Suspense fallback={<Loading message="Loading Sidebar..." />}>
//                   <SideNavBar />
//                 </Suspense>
//               </section>
//               <section className="lg:col-span-10 ">
//                 <Suspense fallback={<Loading message="Loading Sidebar..." />}>
//                   <DashboardHeader />
//                 </Suspense>
//                 <div className="my-4 md:my-8 md:px-8">{children}</div>
//               </section>
//             </div>
//           </StoreProvider>
//         </ThemeProvider>
//       </AppRouterCacheProvider>
//     </HandlerProvider>
//     // </body>
//     // </html>
//   );
// }
