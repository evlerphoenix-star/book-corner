import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
title: "Book Corner | Phoenix Publishing",
description: "Specialist Educational Literature",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (

{children}

);
}
