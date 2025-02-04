// import { ThemeProvider, createTheme, experimental_sx as sx, } from '@mui/material';
import Header from "@/components/layout/Header";
import "./globals.css";
import { Providers } from "./GlobalRedux/provider";
import Footer from "@/components/layout/Footer";
import NavigationBarMobile from "@/components/layout/NavigationBarMobile";
import ReactQueryProvider from "@/components/layout/ReactQueryProvider";
// import RepairingWebsite from "@/components/templates/RepairingWebsite";

export const metadata = {
  title: "آرپوت مارکت",
  description: " فروشگاه سرامیک و کاشی",
  other: {
    enamad: "161104",
    "google-site-verification": "2BngwW2_9i_yvpVnK7gMscU6TeM6MKxLUdA75ciwpY8"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <Providers>
          {/* <ReactQueryProvider> */}
          <Header />
          {children}
          <Footer />
          <NavigationBarMobile />
          {/* <RepairingWebsite/> */}
          {/* </ReactQueryProvider> */}
        </Providers>
      </body>
    </html>
  );
}
