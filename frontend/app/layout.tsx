import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BuilderTreeProvider } from "../providers/BuilderContextProvider";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Umpisa Exam",
  description: "by Benedict Mateo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BuilderTreeProvider>{children}</BuilderTreeProvider>
      </body>
    </html>
  );
}
