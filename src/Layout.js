import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../src/front/styles/App.css";
import {NavBar} from "../src/front/components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./front/pages/dashboard";
import { Branches } from "./front/pages/branches.jsx";
import { Assets } from "./front/pages/assets.jsx";

function Layout({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <BrowserRouter {...pageProps}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/assets" element={<Assets />} />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default Layout;
