import theme from "@/components/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Lato, Oswald, Playfair_Display, Roboto } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StoreProvider from "../StoreProvider";
import Footer from "@/components/Footer/Footer";
import HandlerProvider from "@/lib/providers/HandlerProvider";
import Loading from "../loading";
import { Suspense } from "react";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const oswald = Oswald({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["cyrillic"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: ["--font-playfair"],
});

export const metadata = {
  title: "Green Busket",
  description: "app",
  icons: {
    icon: "/favicon1.ico", // <-- ADD this line
  },
};

export default function RootLayout({ children }) {
  return (
    <div lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <div className={lato.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider>
              <HandlerProvider>
                <Suspense fallback={<Loading message="Loading header..." />}>
                  <Header />
                </Suspense>

                <main>
                  <Suspense fallback={<Loading message="Loading page..." />}>
                    {children}
                  </Suspense>
                </main>

                <Suspense fallback={<Loading message="Loading footer..." />}>
                  <Footer />
                </Suspense>
              </HandlerProvider>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </div>
    </div>
  );
}
