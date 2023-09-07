import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../redux-toolkit/providers"; //Redux
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the document
export const metadata: Metadata = {
  title: "Awesome To Do - GustinDev",
  description:
    "Effortlessly organize and tackle tasks with our user-friendly task management app. Prioritize, set reminders, and stay on track with your daily goals with ease.",
};

// Define the RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
