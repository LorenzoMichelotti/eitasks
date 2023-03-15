"use client";
import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Head from "next/head";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorMode, setColorMode] = useState("light");
  function toggleColorMode() {
    const newColorMode = colorMode === "light" ? "dark" : "light";
    window.localStorage.setItem("theme", newColorMode);
    setColorMode(newColorMode);
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme && savedTheme.length) setColorMode(savedTheme);
    console.log(savedTheme);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>eitasks</title>
      </Head>
      <body
        className={
          montserrat.className +
          ` ${
            colorMode === "dark"
              ? "dark dark:bg-gray-900 text-gray-200"
              : "bg-white"
          }`
        }
      >
        <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <main>{children}</main>
      </body>
    </html>
  );
}
