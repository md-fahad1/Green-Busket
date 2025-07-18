// app/(dashboard)/DashboardLayoutClient.jsx
"use client";

import { Suspense } from "react";
import theme from "@/components/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import StoreProvider from "@/app/StoreProvider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader/DashboardHeader";
import HandlerProvider from "@/lib/providers/HandlerProvider";
import SideNavBar from "@/components/Dashboard/Sidebar/SideNavBar";
import useAuth from "@/hooks/useAuth";
import Loading from "../loading";

export default function DashboardLayoutClient({ children }) {
  const { user, loading } = useAuth({ requiredRole: "admin" });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <HandlerProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StoreProvider>
            <div className="lg:grid lg:grid-cols-12">
              <section className="lg:col-span-2">
                <Suspense fallback={<Loading message="Loading Sidebar..." />}>
                  <SideNavBar />
                </Suspense>
              </section>
              <section className="lg:col-span-10">
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
  );
}
