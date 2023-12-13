import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anode and Kathode",
  description: "Electronics in theory and practice",
};

export default function TechSupport() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <h1 className="text-3xl font-bold">Tech support page</h1>
      </main>
    );
  }
  