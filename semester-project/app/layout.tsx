import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavbarWithMegaMenu from "./components/navbar";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Anode and Kathode",
  description: "Electronics in theory and practice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <main>
        <NavbarWithMegaMenu />
        {children}
        </main>
        <Footer />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
      </body>
    </html>
  );
}
