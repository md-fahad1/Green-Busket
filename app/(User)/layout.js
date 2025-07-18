"use client";
import useAuth from "@/hooks/useAuth";
import theme from "@/components/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import StoreProvider from "@/app/StoreProvider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader/DashboardHeader";
import HandlerProvider from "@/lib/providers/HandlerProvider";
import UserSideNavBar from "@/components/Dashboard/UserSidebar/UserSideNavBar";
import Loading from "../loading";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth({ requiredRole: "user" });

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await verifyToken();

  //     if (!token) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Access Denied!",
  //         text: "Please log in first.",
  //         position: "center", // Display alert in the middle
  //         timer: 3000,
  //         showConfirmButton: false,
  //       });
  //       router.push("/signin"); // Redirect to login if token is invalid
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    // <html lang="en">
    //   <body className="bg-[#F0F0F5] dark:bg-[#0f1214]">
    <HandlerProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StoreProvider>
            <div className="lg:grid lg:grid-cols-12 ">
              <section className="lg:col-span-2">
                <Suspense fallback={<Loading message="Loading Sidebar..." />}>
                  <UserSideNavBar />
                </Suspense>
              </section>
              <section className="lg:col-span-10 ">
                <Suspense fallback={<Loading message="Loading Header..." />}>
                  <DashboardHeader />
                </Suspense>
                <div className="my-4 md:my-8 md:px-8">{children}</div>
              </section>
            </div>
          </StoreProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </HandlerProvider>
    //   </body>
    // </html>
  );
}
